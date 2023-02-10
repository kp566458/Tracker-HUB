import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import "./Notfound.css";
import ReplayIcon from "@material-ui/icons/Replay";
import HomeIcon from "@material-ui/icons/Home";

function Notfound() {
  return (
    <div>
      <Typography align="center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/8610/8610318.png"
          alt=""
          width="20%"
        />
      </Typography>
      <Typography variant="h1" align="center">
        Page not found
      </Typography>
      <Grid container spacing={3} className="grid_buttons">
        <Grid item xs={6}>
          <Button
            className="back_btn_left"
            onClick={() => {
              window.history.back();
            }}
          >
            {" "}
            <ReplayIcon /> Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className="back_btn_right"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            {" "}
            <HomeIcon /> Home
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Notfound;
