import {
  Backdrop,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./Courses.css";
import CommentSystem from "../Comment/CommentSystem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7px",
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CourseDetails = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [courseDetails, setCourseDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [requestDetails, setRequestDetails] = useState();
  const [internalRequestDetails, setInternalRequestDetails] = useState();
  const [courseName, setCourseName] = useState();


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { id } = useParams();

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

  const APIURL = "http://localhost:9092/course/" + id;
  useEffect(() => {
    axios
      .get(APIURL)
      .then((response) => {
        if (response.status === 200) {
          setCourseDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  }, []);

  const APIURL3 = "http://localhost:9092/course/followRequest";
  const sendFollowRequest = (e, courseId, email) => {
    e.preventDefault();
    setInternalRequestDetails(courseId);
    const data = {
      courseId: internalRequestDetails,
      courseName: `${courseName}`,
      useremail: `${email}`,
    };
    axios
      .post(APIURL3, data)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          notify(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const APIURL2 = "http://localhost:9092/follow/courseDetails";
  const handleOpen = (e, val, courseId, email) => {
    e.preventDefault();
    setInternalRequestDetails(courseId);
    setOpen(val);
    axios
      .get(`${APIURL2}/${courseId}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setRequestDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    // getAllCourse();
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
  }, []);


  return (
    <div>
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
      <Typography variant="h3" align="center">
        CourseDetails
      </Typography>
      <Container>
        <Grid
          Container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={12} lg={12} style={{ display: "flex" }}>
            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Course Name :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.courseName}
                </span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Course Duration :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.courseDuration}
                </span>
              </Typography>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <Typography variant="h6">
                Professor :{" "}
                <span className="courseDetailsInfo">
                  {courseDetails?.professorName}
                </span>
              </Typography>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <Button
                className="follow_btn"
                onClick={
                (e) => {
                  handleOpen(
                    e,
                    true,
                    courseDetails?.courseId,
                          userDetails?.email
                  );
                  setCourseName(courseDetails?.courseName);
                }}
              >
                Follow
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ marginTop: "15px" }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>
              <b>Description</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${courseDetails?.courseContent}`,
                }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      </Container>
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
          {requestDetails?.authentication === undefined ||
          requestDetails?.authentication === "NotGranted" ? (
            <div className={classes.paper}>
              <Typography
                id="transition-modal-title"
                align="center"
                variant="h5"
              >
                Send Request for Course Accesses
              </Typography>
              <Grid
                container
                className="CreateCourse_GridContainer"
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item spacing={4}>
                    <Button
                      className="follow_btn"
                      style={{ height: "55px", padding: "0px 20px" }}
                      onClick={(e) => {
                        sendFollowRequest(
                          e,
                          courseDetails?.courseId,
                          userDetails?.email
                        );
                      }}
                    >
                      Send Request
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div className={classes.paper}>
              <Typography
                id="transition-modal-title"
                align="center"
                variant="h5"
              >
                you already accessed this course
              </Typography>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

export default CourseDetails;
