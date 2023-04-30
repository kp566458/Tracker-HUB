import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./Courses.css"
import axios from "axios";
import { toast } from "react-toastify";

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
}));

function Courses() {
  const classes = useStyles();
  const [courses, setCourses] = useState();

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
  const APIURL = "http://localhost:9092/course/"
  useEffect(() => {
    axios.get(APIURL)
    .then((response)=> {
      if(response.status === 200){
        console.log(response.data);
        setCourses(response.data);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      badNotify(error.response.data);
    })
  }, [])

  return (
    <div>
      <Container >
      <Typography variant="h3" align="center">
        Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {
          courses?.map((item,index)=>{
            return(
              <Grid key={index} item>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5" className="course_Title">
                {item?.courseName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {item?.professorName}
                </Typography>
              </CardContent>
              {/* <div className={classes.controls}>
                <Button className="follow_btn">
                 Follow
                </Button>
              </div> */}
            </div>
            <CardMedia
              className={classes.cover}
              image={`${item?.imageURL}`}
              title="Course ThumbNail"
            />
          </Card>          
        </Grid>
            )
          })
        }
        

      </Grid>
      </Container>
    </div>
  );
}

export default Courses;
