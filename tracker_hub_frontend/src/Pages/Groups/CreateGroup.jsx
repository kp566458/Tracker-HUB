import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Container,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import "./CreateGroups.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CreateGroup() {
  const [groupName, setGroupName] = useState();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState("block");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const classes = useStyles();

  const getCreatedGroups = (email) => {
    axios
      .get(`http://localhost:9092/group/prof/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setGroups(response.data);
          setLoading("none");
          console.log("courses :: ", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      groupName: groupName,
      courses: [selectedCourses],
      groupMembers: selectedStudents,
      createdBy: userDetails?.email,
    };
    console.log(data);
    axios
      .post(`http://localhost:9092/group`, data)
      .then((response) => {
        if (response.status === 200) {
          alert("created group successfully");
          setGroupName("");
          setSelectedCourses("");
          setSelectedStudents("");
          console.log("courses :: ", response.data);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const APIURL = "http://localhost:9092/course/prof";

  const GetCourseDetails = (email, courseList) => {
    axios
      .post(`${APIURL}/${email}`, courseList)
      .then((response) => {
        if (response.status === 200) {
          setCourses(response.data);
          console.log("courses :: ", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const GetStudentDetails = (courseId) => {
    axios
      .get(`http://localhost:9092/follow/course/${courseId}/Accepted`)
      .then((response) => {
        if (response.status === 200) {
          setStudents(response.data);
          console.log("students :: ", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const OnSelectCourse = (courseId) => {
    GetStudentDetails(courseId);
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    GetCourseDetails(details?.email, details?.courses);
    getCreatedGroups(details?.email);
  }, []);

  return (
    <div>
      <Paper>
        <Container maxWidth="md">
          <Box m={5} align="center">
            <h3>Create Group</h3>
          </Box>
          <form onSubmit={handleSubmit} className="creatGroupForm">
            <FormControl className={classes.formControl}>
              <TextField
                name="groupName"
                placeholder="Group Name"
                onChange={(event) => setGroupName(event.target.value)}
                margin="normal"
                variant="outlined"
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                //multiple
                labelId="SelectedCourses-label"
                name="selectedCourses"
                placeholder="Selecte Courses"
                value={selectedCourses}
                variant="outlined"
                onChange={(event) => {
                  setSelectedCourses(event.target.value);
                  OnSelectCourse(event.target.value);
                }}
              >
                {courses?.map((course, index) => {
                  return (
                    <MenuItem value={course?.courseId} key={index}>
                      {course?.courseName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                multiple
                labelId="selectedStudents-label"
                name="selectedStudents"
                placeholder="Select Students"
                value={selectedStudents}
                variant="outlined"
                onChange={(event) => setSelectedStudents(event.target.value)}
                inputProps={{ "aria-label": "select multiple options" }}
                renderValue={(selected) => selected.join(", ")}
                required
              >
                {students?.map((student, index) => {
                  return (
                    <MenuItem value={student?.useremail} key={index}>
                      {student?.useremail}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!groupName || !selectedCourses || !selectedStudents}
            >
              Create Group
            </Button>
          </form>
        </Container>

        <div>
          <Typography variant="h5" align="center">
            Groups
          </Typography>

          <Loader visibility={loading} />
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableBody>
                {groups == {} ||
                groups == undefined ||
                groups == "" ||
                groups == null ? (
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
                      <p>No Groups </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  groups?.map((item, index) => {
                    return (
                      <TableRow key={index} style={{ marginBottom: "10px" }}>
                        <TableCell
                          style={{ width: 160 }}
                          component="th"
                          scope="row"
                        >
                          <b>{item?.groupId}</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>{item?.groupName}</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Group Memebers: {item?.groupMembers.length}</b>
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          <Button
                            className="openButton"
                            href={`group/${item?.id}`}
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
        </div>
      </Paper>
    </div>
  );
}

export default CreateGroup;
