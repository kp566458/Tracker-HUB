import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import image1 from "../../Images/image1.png";
import { ArrowForward } from "@material-ui/icons";
import wave from '../../Images/wave.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "100%",
    height: "200px",
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  banner: {
    backgroundImage: `url(${wave})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto",
    width: "100%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Landing() {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} 
              className={classes.banner}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              style={{
                alignItems: "center",
                display: "grid",
                padding: "50px",
                zIndex:0,
                marginTop:'20px',
              }}
            >
              <Typography variant="h4">
                Effortlessly Manage Your Assignments with Our Powerful Tools
              </Typography>
              <Typography variant="body2">
                Our powerful tools make it easy to organize your assignments,
                track your progress, and collaborate with others. Over 90% of
                users report feeling less stressed and more organized after
                using our website.
              </Typography>
              <div>
                <Button variant="outlined">
                  Get Started &nbsp; <ArrowForward />
                </Button>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={image1} alt="00" width="100%" height="auto" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            <Link color="inherit" href="mailto:info@collegename.edu">
              info@assignmentmanagement.com
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Copyright © {new Date().getFullYear()} College Name
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
