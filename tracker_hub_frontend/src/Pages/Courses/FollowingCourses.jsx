import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { QuestionAnswer, Telegram } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function FollowingCourses() {
  const classes = useStyles();
  const APIURL = "http://localhost:9092/course/student";
  const [courses, setCourses] = useState();

  const GetCourses = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setCourses(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    GetCourses(userDetails.email);
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Following Courses</Typography>
          </Paper>
        </Grid>
        {courses?.map((course, index) => {
          return (
            <Grid item xs={3}>
              <Paper className={classes.paper} style={{display:"flex", justifyContent:"space-between"}}>
                <Grid>
                  <Typography variant="h6">{course?.courseName}</Typography>
                  <Typography variant="body1">{course?.courseId}</Typography>
                </Grid>
                <Grid>
                  <Button onClick={
                    ()=>{
                      window.open(`http://localhost:3000/allcourses/courseDetails/${course?.courseId}`)
                    }
                  }>
                    {" "}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8361/8361260.png"
                      height="45px"
                      alt="open"
                    />{" "}
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default FollowingCourses;
