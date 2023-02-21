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
import { Grid, Link, TextField } from "@material-ui/core";

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
  },
});

function CourseFollowers() {
  const classes = useStyles();
  const [courseDetails, setCourseDetails] = useState();
  const [courses, setCourses] = useState();
  const [userDetails, setUserDetails] = useState();
  const [prevAssignments, setPrevAssignments] = useState();
  const [rows, setRows] = useState();

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
    courseId: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

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

  const APIURL = "http://localhost:9092/course/followRequest";
  const GetPrevAssignmentDetails = (courseId) => {
    axios
      .get(APIURL + `/${courseId}/Accepted`)
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleChange = (e, courseId) => {
    e.preventDefault();
    GetPrevAssignmentDetails(courseId);
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    getDestinctCourseByProfessorName(details?.email);
  }, []);

  return (
    <div>
      <Paper>
        <Grid
          container
          className="CreateCourse_GridContainer"
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{padding:15}}
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
              {courses?.map((item, index) => {
                return (
                  <option key={index} value={item?.courseId}>
                    {" "}
                    {item?.courseId} - {item?.courseName}{" "}
                  </option>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12} style={{ margin: 5 }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Course Id</StyledTableCell>
                    <StyledTableCell align="center">
                      Course Name
                    </StyledTableCell>
                    <StyledTableCell align="center">UserName</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.courseId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.courseName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={`viewprofile/${row.useremail}`}>
                          {" "}
                          {row.useremail}{" "}
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default CourseFollowers;
