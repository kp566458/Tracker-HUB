import {
  Avatar,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxHeight: 900,
  },
});

const CourseRequest = () => {
  const classes = useStyles();
  const [followRequestDetails, setFollowRequestDetails] = useState();
  const [course, setCourses] = useState();
  const [courseId, setCourseId] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [followRequestLength, setFollowRequestLength] = useState();
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [notGrantedCount, setNotGrantedCount] = useState(0);

  const { id } = useParams();

  const initialValues = {
    courseId: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

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

  const APIURL = "http://localhost:9092/course/followRequest";
  const getFollowRequestDetails = (courseId, authentication) => {
    axios
      .get(`${APIURL}/${courseId}/${authentication}`)
      .then((response) => {
        if (response.status === 200) {
          setFollowRequestDetails(response.data, () => {
            console.log("invoked :: ", followRequestDetails);
          });
        }
      })
      .catch((error) => {
        badNotify(error.response.data);
      });
  };

  const APIURL2 = "http://localhost:9092/course/distinctCourse";
  const getDestinctCourseByProfessorName = (professorName) => {
    axios
      .get(`${APIURL2}/${professorName}`)
      .then((response) => {
        if (response.status === 200) {
          setCourses(response.data);
        }
      })
      .catch((error) => {
        badNotify(error.response.data);
      });
  };

  const APIURL5 = "http://localhost:9092/course/followRequest";
  const GetRequestCount = (courseId) => {
    axios
      .get(`${APIURL5}/${courseId}/all`)
      .then((response) => {
        if (response.status === 200) {
          const count = response.data;
          const acceptedCounts = count.filter(function (item) {
            return item?.authentication === "Accepted";
          });
          const rejectedCounts = count.filter(function (item) {
            return item?.authentication === "Rejected";
          });
          const notGrantedCounts = count.filter(function (item) {
            return item?.authentication === "NotGranted";
          });
          setAcceptedCount(acceptedCounts.length);
          setRejectedCount(rejectedCounts.length);
          setNotGrantedCount(notGrantedCounts?.length);
          console.log("Accepted Count :: " + acceptedCount);
        }
      })
      .catch((error) => {
        badNotify(error.response.data);
      });
  };

  const handleChange = (e, courseId) => {
    console.log("course Id :: " + courseId);
    setCourseId(courseId);
    getFollowRequestDetails(courseId, "NotGranted");
    GetRequestCount(courseId);
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    getDestinctCourseByProfessorName(details?.email);
  }, []);

  const APIURL3 = "http://localhost:9092/request/accept";

  const postRequestAcceptance = (requestId, email, courseId, index) => {
    axios
      .post(`${APIURL3}/${email}/${courseId}`, {
        requestId: `${requestId}`,
        courseId: `${courseId}`,
        userEmail: `${email}`,
        profEmail: `${userDetails?.email}`,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          notify(response);
          setIsVisible(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  const APIURL4 = "http://localhost:9092/request/reject";

  const postRequestReject = (requestId, email, courseId, index) => {
    console.log("index ::" + index);

    axios
      .post(`${APIURL4}/${email}/${courseId}`, {
        requestId: `${requestId}`,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          notify(response);
          setIsVisible(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  return (
    <div>
      <Paper>
        <Typography variant="h4" align="center">
          Request Access Control
        </Typography>
        <Grid
          container
          className="CreateCourse_GridContainer"
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={12} md={11}>
            <TextField
              id="courseId"
              placeholder="course Id"
              variant="outlined"
              name="courseId"
              onChange={(e) => {
                handleChange(e, e.target.value);
              }}
              select
              SelectProps={{
                native: true,
              }}
              helperText="Please select course to check request"
              autoComplete="off"
            >
              <option key="" value="">
                {" "}
                -- Select Course --{" "}
              </option>
              {course?.map((item, index) => {
                return (
                  <option key={index} value={item?.courseId}>
                    {" "}
                    {item?.courseId} - {item?.courseName}{" "}
                  </option>
                );
              })}
            </TextField>
          </Grid>
          <Grid item spacing={4}>
            <Chip
              label="Courses"
              avatar={<Avatar>{course?.length}</Avatar>}
              color="primary"
            />{" "}
            &nbsp;
            <Chip
              avatar={<Avatar>{followRequestDetails?.length}</Avatar>}
              label="Request"
              color="secondary"
            />{" "}
            &nbsp;
            <Chip
              avatar={
                <Avatar>
                  {notGrantedCount + acceptedCount + rejectedCount}
                </Avatar>
              }
              label="Total Request"
            />{" "}
            &nbsp;
            <Chip
              avatar={<Avatar>{acceptedCount}</Avatar>}
              label="Accepted"
              color="primary"
            />
            &nbsp;
            <Chip
              avatar={<Avatar>{rejectedCount}</Avatar>}
              color="secondary"
              label="Rejected"
            />
            
          </Grid>
          
          <Grid item xs={12} style={{margin:5}}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Request Id</StyledTableCell>
                  <StyledTableCell align="right">Course Name</StyledTableCell>
                  <StyledTableCell align="right">User Name</StyledTableCell>
                  <StyledTableCell align="right">
                    Accept / Reject
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {followRequestDetails?.map((row, i) =>
                  isVisible ? null : (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {row?.requestId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.courseName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row?.useremail}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            postRequestAcceptance(
                              row?.requestId,
                              row?.useremail,
                              courseId,
                              i
                            );
                          }}
                        >
                          Accept
                        </Button>{" "}
                        &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            postRequestReject(
                              row?.requestId,
                              row?.useremail,
                              i
                            );
                          }}
                        >
                          Reject
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
};

export default CourseRequest;
