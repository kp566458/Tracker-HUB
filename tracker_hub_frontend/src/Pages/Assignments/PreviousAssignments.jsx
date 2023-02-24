import {
  AccordionActions,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import "./PreviousAssignment.css";
import Loader from "../Loader/Loader";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PreviousAssignments() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("");
  const [prevAssignments, setPrevAssignments] = useState();
  const [messages, setMessages] = useState();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState("block");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const APIURL = "http://localhost:9092/assignment";
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

  const getMessages = (assignmentId, email) => {
    axios
      .get("http://localhost:9092/task" + `/${assignmentId}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  let userEMail;
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    GetPrevAssignmentDetails(details.email);
  }, []);

  return (
    <div>
      <Paper>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          Previous Assignment
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
                          href={`view_assignment/${item?.assignmentId}`}
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {messages?.map((message, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    padding: "10px 5px",
                  }}
                >
                  <h6>{message.useremail}</h6>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${message.description}`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PreviousAssignments;
