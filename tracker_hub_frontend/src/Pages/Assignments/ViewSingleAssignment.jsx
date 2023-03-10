import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import SendIcon from "@material-ui/icons/Send";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import {
  CheckCircle,
  Loop,
  QuestionAnswer,
  Reply,
  Telegram,
  Visibility,
} from "@material-ui/icons";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const theme = {
  spacing: 8,
};

function ViewSingleAssignment() {
  const { id } = useParams();
  const classes = useStyles();
  const [assignments, setAssignments] = useState();
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState();
  const [userDetails, setUserDetails] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const taskRef = useRef(null);
  const [score, setScore] = useState();
  const [visibility, setVisibility] = useState("block");
  const [loopVisibility, setLoopVisibility] = useState("none");
  const [circleColor, setCircleColor] = useState();
  const [reply, setReply] = useState();
  const [messageVisibility, setMessageVisibility] = useState("none");
  const [messages, setMessages] = useState();

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

  const APIURL6 = "http://localhost:9092/task/prof";
  const GetAllTask = (assignmentid, email) => {
    axios(`${APIURL6}/${assignmentid}/${email}`)
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  const submitTask = (e) => {
    e.preventDefault();
    const data = {
      assignmentId: id,
      useremail: userDetails?.email,
      description: taskRef.current.getContent(),
      courseId: assignments?.courseId,
      profEmail: assignments?.profEmail,
    };

    axios({
      method: "post",
      url: APIURL6,
      data: data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
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
          taskRef.current.setContent("");
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
        taskRef.current.setContent("");
      });
  };

  const APIURL = "http://localhost:9092/assignment/view";
  const getAssignmentDetails = (submitId) => {
    axios
      .get(`${APIURL}/${submitId}`)
      .then((response) => {
        if (response.status === 200) {
          setAssignments(response.data)
          setTimeout(() => {
            GetAllTask(response.data.assignmentId, response.data.profEmail);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  var real = "";
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
      real = editorRef.current.getContent();
      setDescription(editorRef.current.getContent());
    }
  };

  const getAllMessages = (id) => {
    axios({
      method: "get",
      url: `http://localhost:9092/message/${id}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      assignmentId: id,
      description: real,
      messagedBy: userDetails?.email,
    };
    axios({
      method: "post",
      url: `http://localhost:9092/message/`,
      data: data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          notify(response.data);
          getAllMessages(id);
          setFormValues({
            description: "",
            attachments: "",
          });
          setSelectedFiles({});
          taskRef.current.setContent("");
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
        taskRef.current.setContent("");
      });
  };

  const updateScore = (score, submitId) => {
    setVisibility("none");
    setLoopVisibility("block");
    axios
      .put(
        `http://localhost:9092/sumbitAssignment/update/prof/${submitId}/${score}`
      )
      .then((response) => {
        if (response.status === 200) {
          setVisibility("block");
          setLoopVisibility("none");
          setCircleColor("green");
          notify("updated");
          setScore("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  const addReply = (e, inputTask) => {
    e.preventDefault();
    const data = {
      description: reply,
      fromMail: userDetails?.email,
    };
    inputTask.replies = [data];
    axios
      .put(
        `http://localhost:9092/task/prof/${id}/${userDetails?.email}`,
        inputTask
      )
      .then((response) => {
        if (response.status === 200) {
          setMessageVisibility("block");
          setReply(" ");
          setTimeout(() => {
            setMessageVisibility("none");
            GetAllTask(id, userDetails?.email);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getAssignmentDetails(id);
    getAllMessages(id);
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper
            className={classes.paper}
            style={{ padding: "10px", marginBottom: "10px" }}
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <b>Assignment ID:</b> &nbsp; {id}
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <b>Max Score:</b> &nbsp; {assignments?.maxScore}
              </Grid>
            </Grid>
          </Paper>
          <Paper
            className={classes.paper}
            style={{ padding: "10px", marginBottom: "10px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              {" "}
              <b>Description</b>{" "}
            </h3>
            <Divider style={{ marginBottom: 10 }} />
            <div
              dangerouslySetInnerHTML={{
                __html: `${assignments?.description}`,
              }}
            />
          </Paper>
          <Paper
            className={classes.paper}
            style={{ padding: 10, marginBottom: 10 }}
          >
            <h3>Attachments</h3>
            <Divider style={{ marginBottom: 10 }} />

            {assignments?.attachments?.map((ping, index) => {
              return (
                <>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      window.open(ping);
                      if (
                        ping.includes("jpg") ||
                        ping.includes("png") ||
                        ping.includes("image/jpeg")
                      ) {
                        let win = window.open("about:blank");
                        let image = new Image();
                        image.src = ping;
                        setTimeout(() => {
                          win.document.write(image.outerHTML);
                        }, 0);
                      }
                      if (ping.includes("application/pdf")) {
                        window.open(ping);
                      }
                    }}
                  >
                    {ping.includes("jpg") || ping.includes("png") ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                        height="30px"
                        alt="IMAGE"
                      />
                    ) : ping.includes("pdf") ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                        height="30px"
                        alt="PDF"
                      />
                    ) : null}
                  </Button>
                </>
              );
            })}
          </Paper>
          <Paper
            className={classes.paper}
            style={{ padding: "10px", marginBottom: "10px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              {" "}
              <b>Discussion</b> <Divider />
            </h3>
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 130,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="course_submit_button">
              <Button
                onClick={(e) => {
                  log();
                  handleSubmit(e);
                }}
                className="follow_btn "
              >
                <SendIcon /> &nbsp; send
              </Button>
            </div>
            <Box sx={{ m: 4 }}>
              <Divider />
            </Box>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              {messages?.map((message, index) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "9px", marginLeft: "05px" }}>
                      {message?.messagedBy}
                    </span>
                    <div
                      style={{
                        background:
                          `${message?.messagedBy}` == `${userDetails?.email}`
                            ? "#F0EEED"
                            : "#BDCDD6",
                        width: `fit-content`,
                        padding: 10,
                        borderRadius: "5px",
                        display: "flex",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${message?.description}`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ height: "100%" }}>
            <h1 style={{ textAlign: "center" }}>Tasks</h1>

            <div
              style={{
                marginTop: 10,
              }}
            >
              {tasks?.map((task, index) => {
                return (
                  <Paper
                    key={index}
                    style={{
                      padding: 5,
                      marginBottom: 15,
                    }}
                  >
                    <b>{task?.useremail}</b>
                    <Divider />
                    <div
                      style={{
                        marginTop: 10,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${task?.description}`,
                      }}
                    />

                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: 10,
                        }}
                      >
                        <b>Reply</b> &nbsp;
                        <TextField
                          name="reply"
                          style={{
                            width: "60%",
                          }}
                          onChange={(e) => {
                            setReply(e.target.value);
                          }}
                          variant="outlined"
                        />
                        &nbsp;
                        <Button
                          style={{
                            border: "1px solid black",
                          }}
                          onClick={(e) => {
                            addReply(e, task);
                          }}
                        >
                          <Reply
                            style={{
                              transform: "scaleX(-1)",
                            }}
                          />
                        </Button>
                      </div>
                      <p
                        className="messageSent"
                        style={{
                          display: `${messageVisibility}`,
                        }}
                      >
                        Message sent . . .
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <b> Replied:</b>
                      <Divider />
                      {task?.replies?.map((rep, index) => {
                        return (
                          <p
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <span>
                              {" "}
                              {rep?.fromMail == userDetails?.email
                                ? "You"
                                : rep?.fromMail}
                            </span>{" "}
                            - {rep?.description}{" "}
                          </p>
                        );
                      })}
                    </div>
                  </Paper>
                );
              })}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewSingleAssignment;
