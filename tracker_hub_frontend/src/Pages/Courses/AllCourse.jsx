import {
  Backdrop,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./Courses.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
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

const AllCourses = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState();
  const [userDetails, setUserDetails] = useState();
  const [requestDetails, setRequestDetails] = useState();
  const [internalRequestDetails, setInternalRequestDetails] = useState();
  const [courseName, setCourseName] = useState();
  const [activatedKeyInput, setActivatedKeyInput] = useState();

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

  const APIURL = "http://localhost:9092/course/";
  const getAllCourse = () => {
    axios
      .get(APIURL)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCourses(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  useEffect(() => {
    getAllCourse();
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
  }, []);

  const [open, setOpen] = React.useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

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



  return (
    <div>
      <Container maxWidth="xl">
        <Typography variant="h3" align="center">
          Courses
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {courses?.map((item, index) => {
            return (
              <Grid key={index} item>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography
                        component="h5"
                        variant="h5"
                        className="course_Title"
                      >
                        {item?.courseName}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {item?.professorName}
                      </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                      <Button
                        className="follow_btn follow_left"
                        onClick={(e) => {
                          handleOpen(
                            e,
                            true,
                            item?.courseId,
                            userDetails?.email
                          );
                          setCourseName(item?.courseName);
                        }}
                      >
                        Follow
                      </Button>

                      <Button
                        href={`/allcourses/courseDetails/${item?.courseId}`}
                        className="follow_btn follow_right"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={`${item?.imageURL}`}
                    title="Course ThumbNail"
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
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
                          internalRequestDetails,
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
};

export default AllCourses;
