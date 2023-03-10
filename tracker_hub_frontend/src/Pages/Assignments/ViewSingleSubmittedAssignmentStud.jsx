import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import {
  AttachFile,
  FileCopy,
  QuestionAnswer,
  Send,
  Telegram,
  ReplyIcon,
  Reply,
} from "@material-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ViewSingleSubmittedAssignmentStud () {
  const { id } = useParams();
  const classes = useStyles();
  const [assignments, setAssignments] = useState();
  const [description, setDescription] = useState();
  const [open, setOpen] = React.useState(false);
  const [msgSection, setMsgSection] = useState();
  const [userDetails, setUserDetails] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [messagesList, setMessagesList] = useState();
  const [currentAssignmentId, setCurrentAssignmentId] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [tasks, setTasks] = useState();
  const [attachments, setAttachments] = useState([]);
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
    attachments: [],
  };

  const [formValues, setFormValues] = useState(initialValues);

  const GetAllTask = (assignmentid, email) => {
    // e.preventDefault();
    axios(`http://localhost:9092/task/stud/${assignmentid}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };
  const APIURL = "http://localhost:9092/assignment/view";
  const getAssignmentDetails = (courseId) => {
    axios
      .get(`${APIURL}/${courseId}`)
      .then((response) => {
        if (response.status === 200) {
          setAssignments(response.data, () => {
            console.log("invoked :: ", assignments);
          });
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
          console.log("New latest", response.data);
          setApiResponse(response);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setApiResponse(error.response);
      });
  };

  const APIURL4 = "http://localhost:9092/message";
  const getAllMessages = (assignmentId) => {
    axios
      .get(APIURL4 + `/${assignmentId}`)
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(" Messages :: " + error.response.data);
      });
  };

  var real = "";
  const editorRef = useRef(null);
  const taskRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
      real = editorRef.current.getContent();
      setDescription(editorRef.current.getContent());
    }
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

  const handleSubmitAssignment = (assignmentId) => {
    setOpen(true);
    setMsgSection("submitAssignment");
    GetSubmittedAssignments(assignmentId);
  };

  const handleComment = (assignmentId) => {
    setOpen(true);
    setMsgSection("comment");
    getAllMessages(assignmentId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files && e.target.files.length > 0) {
      console.log("files Slected :: " + e.target.files.length);
      let newFiles = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          newFiles.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setAttachments(newFiles);
    }
  };

  const APIURL2 = "http://localhost:9092/sumbitAssignment/";
  const submitApiAssignment = (e, assignmentId) => {
    e.preventDefault();
    const data = {
      assignmentId: assignmentId,
      description: description,
      messagedBy: userDetails?.email,
      profEmail: assignments?.profEmail,
      attachments: attachments,
    };
    console.log("Files Selected :: " + selectedFiles);
    axios({
      method: "post",
      url: APIURL2,
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

  const APIURL6 = "http://localhost:9092/task";
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

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    getAssignmentDetails(id);
    getAllMessages(id);
    setUserDetails(details);
    GetAllTask(id, details.email);
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
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <b>Assignment ID:</b> &nbsp; {id}
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <b>Max Score</b> &nbsp; {assignments?.maxScore}
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <b>Secured Score</b> &nbsp; {assignments?.score}
              </Grid>
              {/* <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={(e) => {
                    handleSubmitAssignment(id);
                    setCurrentAssignmentId(id);
                  }}
                >
                  submit Assignment &nbsp; <Telegram />{" "}
                </Button>
              </Grid> */}
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
                <span key={index}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
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
                    {ping.includes("jpg") ||
                    ping.includes("png") ||
                    ping.includes("image/jpeg") ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                        height="30px"
                        alt="IMAGE"
                      />
                    ) : ping.includes("application/pdf") ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                        height="30px"
                        alt="PDF"
                      />
                    ) : null}
                  </Button>
                </span>
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
              <Box sx={{ m: 4 }}>
                <Divider />
              </Box>
              <div style={{
                marginBottom:"10px"
              }}>
                {messages?.map((message, index) => {
                  return (
                    <div style={{
                      textAlign:'left'
                    }}
                    key={index}
                    >
                      <span style={{ fontSize: "9px", marginLeft: "5px" }}>
                        {message?.messagedBy}
                      </span>
                      <div
                        style={{
                          background: (`${message?.messagedBy }`==  `${userDetails?.email}`) ? '#F0EEED':'#BDCDD6',
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
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ height: "100%" }}>
            <h1 style={{ textAlign: "center" }}>Tasks</h1>

            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              style={{
                marginTop: 20,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <Editor
                    tinymceScriptSrc={
                      process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                    }
                    onInit={(evt, editor) => (taskRef.current = editor)}
                    init={{
                      height: 150,
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
                </Grid>
                <Grid
                item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    style={{
                      border: "1px solid black",
                    }}
                    onClick={(e) => {
                      submitTask(e);
                    }}
                  >
                    <SendOutlinedIcon />
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Divider
              style={{
                marginTop: 20,
                height: 5,
              }}
            />
            <div
              style={{
                marginTop: 10,
              }}
            >
              {tasks?.map((task, index) => {
                return (
                  <Paper
                    style={{
                      padding: 5,
                      marginBottom: 15,
                    }}
                    key={index}
                  >
                    <b>
                      {task?.useremail == userDetails?.email
                        ? "You"
                        : task?.useremail}
                    </b>
                    <Divider />
                    <div
                      style={{
                        marginTop: 10,
                        padding: 10,
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
                      <b>Reply</b> &nbsp; <TextField variant="outlined" />
                      &nbsp;
                      <Button
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <Reply
                          style={{
                            transform: "scaleX(-1)",
                          }}
                        />
                      </Button>
                    </div>
                    <Divider />
                    <div>
                      <b> Replies:</b>
                      <Divider />
                      {task?.replies?.map((rep, index) => {
                        return (
                          <p
                            style={{
                              textAlign: "right",
                            }}
                            key={index}
                          >
                            {rep?.description} -<span> {rep?.fromMail}</span>{" "}
                          </p>
                        );
                      })}
                    </div>
                  </Paper>
                );
              })}
            </div>
            <div></div>
          </Paper>
        </Grid>
      </Grid>

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
          {msgSection === "submitAssignment" ? (
            <div className={`${classes.paper} model_Controller`}>
              {apiResponse?.status === 400 ? (
                <>
                  <h2 id="transition-modal-title">Submit Assignment</h2>
                  <div id="transition-modal-description">
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      sm={12}
                      alignItems="center"
                    >
                      <label for="description" className="courseLabels">
                        {" "}
                        Description{" "}
                      </label>
                      <Editor
                        tinymceScriptSrc={
                          process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                        }
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                          height: 300,
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
                    </Grid>
                    <div>
                      <label htmlFor="">Attach</label>{" "}
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input
                          hidden
                          accept="*"
                          type="file"
                          id="attachments"
                          name="attachments"
                          value={formValues.attachments}
                          multiple
                          onChange={(e) => {
                            log();
                            handleChanges(e);
                          }}
                        />
                        <AttachFile />
                      </IconButton>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="default"
                        onClick={(e) => {
                          submitApiAssignment(e, currentAssignmentId);
                        }}
                      >
                        {" "}
                        <Send />{" "}
                      </Button>
                    </div>
                  </div>
                </>
              ) : apiResponse?.status === 200 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "600px",
                  }}
                >
                  <Typography variant="h5">
                    You already Submitted the task{" "}
                  </Typography>
                </div>
              ) : null}
            </div>
          ) : msgSection === "comment" ? (
            <div className={`${classes.paper} model_Controller`}>
              <h2 id="transition-modal-title">Comments</h2>
              <div id="transition-modal-description">
                <Grid item xs={12} md={12} lg={12} sm={12} alignItems="center">
                  <label for="description" className="courseLabels">
                    {" "}
                    Description{" "}
                  </label>
                  <Editor
                    tinymceScriptSrc={
                      process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                    }
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 300,
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
                </Grid>
                <div>
                  <label htmlFor=""> Attach</label>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="*"
                      type="file"
                      id="attachments"
                      name="attachments"
                      value={formValues.attachments}
                      multiple
                      onChange={(e) => {
                        log();
                        handleChanges(e);
                      }}
                    />
                    <AttachFile />
                  </IconButton>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={(e) => {
                      submitComment(e);
                    }}
                  >
                    {" "}
                    <Send />{" "}
                  </Button>
                </div>
              </div>
              <div className="comment_Collection_MainController">
                <Grid container spacing={3} className="grid_loop_Controll">
                  {messagesList?.map((msg, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <Paper className={classes.paper}>
                          <h5>
                            {msg?.messagedBy} {msg?.messageDate}{" "}
                          </h5>
                          {msg?.attachments?.map((pic, i) => {
                            return (
                              <IconButton
                                key={i}
                                color="default"
                                aria-label="add to shopping cart"
                                onClick={() => {
                                  window.open(pic);
                                }}
                              >
                                <FileCopy />
                              </IconButton>
                            );
                          })}

                          <Typography variant="body1">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${msg?.description}`,
                              }}
                            />
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          ) : null}
        </Fade>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

