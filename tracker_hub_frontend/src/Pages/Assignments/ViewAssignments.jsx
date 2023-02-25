import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import "./ViewAssignment.css";
import Loader from "../Loader/Loader";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1000px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ViewAssignments() {
  const [expanded, setExpanded] = React.useState("");
  const [prevAssignments, setPrevAssignments] = useState();
  const [msgSection, setMsgSection] = useState();
  const [userDetails, setUserDetails] = useState();
  const [currentAssignmentId, setCurrentAssignmentId] = useState();
  const [description, setDescription] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [messagesList, setMessagesList] = useState();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState("block");

  const editorRef = useRef(null);
  var real = "";
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
      real = editorRef.current.getContent();
      setDescription(editorRef.current.getContent());
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const badNotify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const initialValues = {
    attachments: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const APIURL = "http://localhost:9092/assignment/student";
  const GetPrevAssignmentDetails = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setLoading("none");
          setPrevAssignments(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const APIURL3 = "http://localhost:9092/sumbitAssignment";
  const GetSubmittedAssignments = (assignmentId) => {
    axios
      .get(APIURL3 + `/${assignmentId}/${userDetails?.email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setApiResponse(response);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setApiResponse(error.response);
      });
  };

  const APIURL4 = "http://localhost:9092/message";
  const GetAllMessages = (assignmentId) => {
    axios
      .get(APIURL4 + `/${assignmentId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMessagesList(response.data);
        }
      })
      .catch((error) => {
        console.log(" Messages :: " + error.response.data);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmitAssignment = (assignmentId) => {
    setOpen(true);
    setMsgSection("submitAssignment");
    GetSubmittedAssignments(assignmentId);
  };

  const handleComment = (assignmentId) => {
    setOpen(true);
    setMsgSection("comment");
    GetAllMessages(assignmentId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      console.log("files Slected :: " + e.target.files.length);
    }
  };

  const APIURL2 = "http://localhost:9092/sumbitAssignment/";

  const submitApiAssignment = (e, assignmentId) => {
    e.preventDefault();
    const data = {
      assignmentId: assignmentId,
      description: description,
      messagedBy: userDetails?.email,
    };
    const formData = new FormData();
    formData.append("assignment", JSON.stringify(data));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    console.log("Files Selected :: " + selectedFiles);
    axios({
      method: "post",
      url: APIURL2,
      data: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          notify(response.data);
          setFormValues({
            description: "",
            attachments: "",
          });
          setSelectedFiles({});
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({
          description: "",
          attachments: "",
        });
        setSelectedFiles({});
        editorRef.current.setContent("");
      });
  };

  const APIURL5 = "http://localhost:9092/message/";

  const submitComment = (e) => {
    e.preventDefault();
    const data = {
      assignmentId: currentAssignmentId,
      description: description,
      messagedBy: userDetails?.email,
    };
    const formData = new FormData();
    formData.append("message", JSON.stringify(data));
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    console.log("Files Selected :: " + selectedFiles);
    axios({
      method: "post",
      url: APIURL5,
      data: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          notify(response.data);
          setFormValues({
            description: "",
            attachments: "",
          });
          setSelectedFiles({});
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({
          description: "",
          attachments: "",
        });
        setSelectedFiles({});
        editorRef.current.setContent("");
      });
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    GetPrevAssignmentDetails(details.email);
    setUserDetails(userDetails);
  }, []);

  return (
    <div>
      <Paper>
        <Typography variant="h4" align="center">
          Assignments
        </Typography>
        <Loader visibility={loading} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {prevAssignments == {} ||
              prevAssignments == undefined ||
              prevAssignments == "" ||
              prevAssignments == null ? (
                <TableRow>
                  <TableCell
                    style={{
                      color: "lightgray",
                      background: "#E5E4E2",
                      height: "60px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                    }}
                    component="th"
                    colSpan={3}
                    scope="row"
                  >
                    <p>No Previous Assignment</p>
                  </TableCell>
                </TableRow>
              ) : (
                prevAssignments?.map((item, index) => {
                  return (
                    <TableRow key={index} style={{ marginBottom: "10px" }}>
                      <TableCell
                        style={{ width: 160 }}
                        component="th"
                        scope="row"
                      >
                        <b>{item?.assignmentId}</b>
                      </TableCell>
                      <TableCell align="left">{item?.title}</TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          className="openButton"
                          href={`view_assignment_stud/${item?.assignmentId}`}
                        >
                          <ArrowRightAltIcon
                            style={{
                              color: "#FFB100",
                              transform: "scale(1.8)",
                            }}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ViewAssignments;
