import {
  Button,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import DialpadIcon from "@material-ui/icons/Dialpad";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./Contactus.css";

function Contactus() {
  return (
    <div>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="ContactUs_Main_Container"
        >
          <Grid item xs={6} md={6}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="h3">Get in Touch With Us</Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              iusto laboriosam quod quibusdam, eaque nostrum impedit enim
              dolores dolorum perspiciatis itaque recusandae ut facilis
              excepturi delectus asperiores voluptatum pariatur provident!
            </Typography>
            <Grid xs={12} className="Contactus_leftGrid" style={{ display: "flex" }}>
              <Grid
                xs={2}
                md={2}
                sm={2}
                alignItems="center"
                style={{ display: "flex" }}
                className="Contactus_Icons"
              >
                <MyLocationIcon />
              </Grid>
              <Grid xs={9} md={9} sm={9} className="Contactus_rightGrid">
                <Typography variant="h6">Our Location</Typography>
                <Typography paragraph>
                  99 S.t Jumblo Park Pekanbaru 28292, Indonesia
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={12} className="Contactus_leftGrid" style={{ display: "flex" }}>
              <Grid
                xs={2}
                md={2}
                sm={2}
                alignItems="center"
                style={{ display: "flex" }}
                className="Contactus_Icons"
              >
                <DialpadIcon />
              </Grid>
              <Grid xs={9} md={9} sm={9} className="Contactus_rightGrid">
                <Typography variant="h6">Phone Number</Typography>
                <Typography paragraph>+{62} 81 414 257 9980</Typography>
              </Grid>
            </Grid>

            <Grid xs={12} className="Contactus_leftGrid" style={{ display: "flex" }}>
              <Grid
                xs={2}
                md={2}
                sm={2}
                alignItems="center"
                style={{ display: "flex"}}
                className="Contactus_Icons"
              >
                <MailOutlineIcon/>
              </Grid>
              <Grid xs={9} md={9} sm={9} className="Contactus_rightGrid">
                <Typography variant="h6">Email Address</Typography>
                <Typography paragraph>support@trackerhub.co.in</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={6} sm={6} md={6} className="ContactUs_Right_MainContainer">
            <Grid className="Contactus_InputForm_Fields">
              <TextField className="FormInput_Fields4Contact"
                id="outlined-basic"
                placeholder="Your Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid className="Contactus_InputForm_Fields">
              <TextField className="FormInput_Fields4Contact"
                id="outlined-basic"
                placeholder="Your Email"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid className="Contactus_InputForm_Fields">
              <TextField className="FormInput_Fields4Contact"
                id="outlined-basic"
                placeholder="Your Phone"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid className="Contactus_InputForm_Fields">
              <TextareaAutosize className="FormInput_Fields4Contact textArea_Input" maxRows={4} placeholder="Your Message" />
            </Grid>
            <Grid className="Contactus_InputForm_Fields">
              <Button className="FormInput_Fields4Contact">Send Message</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Contactus;
