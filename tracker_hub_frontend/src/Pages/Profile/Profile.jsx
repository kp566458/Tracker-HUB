import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  TextField,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@material-ui/core";
import {
  ArrowRight,
  Camera,
  CameraAltOutlined,
  CameraOutlined,
  CheckCircleRounded,
  Edit,
  EditRounded,
  ExpandMore,
} from "@material-ui/icons";
import axios from "axios";
import "./Profile.css";

const data = {
  name: "John Doe",
  headline: "Software Developer",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  experience: [
    {
      company: "Acme Inc.",
      title: "Software Engineer",
      date: "Jan 2020 - Present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      company: "XYZ Corp.",
      title: "Front-end Developer",
      date: "Jun 2018 - Dec 2019",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  education: [
    {
      institution: "University of ABC",
      degree: "Bachelor of Science in Computer Science",
      date: "Sep 2014 - Jun 2018",
    },
  ],
  profileImageUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  backgroundImageUrl:
    "https://marketplace.canva.com/EAFFD-NjoXI/1/0/1600w/canva-ivory-simple-modern-business-consultant-linkedin-banner-5umpFmRF-PM.jpg",
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 140,
  },
  input: {
    display: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "600px",
    marginTop: "100px",
    paddingTop: "700px",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7px",
  },

  header: {
    backgroundColor: "#9e9e9e",
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
  banner: {
    backgroundImage: `url(${data.backgroundImageUrl})`,
    backgroundSize: "cover",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1,
    },
  },
  bannerText: {
    color: theme.palette.common.white,
    zIndex: 2,
    textAlign: "center",
  },
  name: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: `-${theme.spacing(10)}px 0 ${theme.spacing(3)}px`,
    border: `5px solid ${theme.palette.common.white}`,
    position: "relative",
    zIndex: 2,
  },
  IconButton: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState(userDetails?.username);
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState("");
  const [salt, setSalt] = useState();
  const [experience, setExperience] = useState(userDetails?.experience);
  const [education, setEducation] = useState(userDetails?.education);
  const [headline, setHeadline] = useState(userDetails?.headline);
  const [about, setAbout] = useState(userDetails?.about);
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    "https://marketplace.canva.com/EAFFD-NjoXI/1/0/1600w/canva-ivory-simple-modern-business-consultant-linkedin-banner-5umpFmRF-PM.jpg"
  );

  const completeUserDetails = (e, email) => {
    const APIURL = "http://localhost:9092/user";
    axios
      .get(`${APIURL}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setUserDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect((e) => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setEmail(details?.email);
    completeUserDetails(e, details?.email);
    const intialiseData = ()=>{
          setName(userDetails?.name);
            setHeadline(userDetails?.headline);
            setAbout(userDetails?.about);
            setExperience(userDetails?.experience);
            setEducation(userDetails?.education);
    }
  }, []);

  const handleOpen = (e, val) => {
    e.preventDefault();
    setOpen(val);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event, email) => {
    event.preventDefault();
    const data = {
      username: name,
      headlin: headline,
      about: about,
      experience: experience,
      education: education,
    };
    console.log({
      name,
      headline,
      about,
      experience,
      education,
    });
    const APIURL = "http://localhost:9092/user/update";
    axios
      .patch(`${APIURL}/${email}`, {
        username: name,
        headline: headline,
        about: about,
        experience: experience,
        education: education,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          alert(response.data);
          completeUserDetails(response, email);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const uploadProfileImage = (e, file) => {};

  const uploadBannerImage = (e, file) => {};

  const updateChangePassword = (e) => {
    if (
      (password === rePassword && userDetails?.email !== null) ||
      userDetails?.email !== undefined
    ) {
      axios
        .put("http://localhost:9092/user/change/password", {
          email: `${userDetails?.email}`,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            alert(response.data);
            setPassword("");
            setRePassword("");
          }
        })
        .catch((error) => {
          alert(error.response.data);
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <Paper style={{paddingTop: 10}}>
      <Container maxWidth="md">
        <div className={classes.banner}>
          <div className={classes.bannerText}>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    name="profileImage"
                    onChange={(e) => {
                      uploadProfileImage(e, e.target.files[0]);
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="default"
                      aria-label="Edit picture"
                      component="span"
                      className="iconButtonStyle"
                    >
                      <EditRounded />
                    </IconButton>
                  </label>
                </>
              }
            >
              <Avatar
                src={profileImageUrl}
                alt={name}
                className={classes.avatar}
              />
            </Badge>

            <Typography variant="h4">{userDetails?.username}</Typography>
            <Typography variant="h5">{userDetails?.headline}</Typography>
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                name="bannerImage"
                onChange={(e) => {
                  uploadBannerImage(e, e.target.files[0]);
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="default"
                  aria-label="Edit picture"
                  component="span"
                  className="bannerButtonStyle"
                >
                  <CameraAltOutlined />
                </IconButton>
              </label>
            </>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              onClick={(e) => {
                handleOpen(e, true);
              }}
              color="default"
              variant="contained"
            >
              Edit <Edit />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{userDetails?.headline}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{userDetails?.about}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Experience</Typography>
            <div>
              <Typography variant="subtitle1">
                {userDetails?.experience}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Education</Typography>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                {userDetails?.education}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <b>Change Password</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Change Password</b>{" "}
                    </label>
                    <TextField
                      placeholder="Change Password"
                      fullWidth
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Confirm Password</b>{" "}
                    </label>
                    <TextField
                      placeholder="Repeat Password"
                      fullWidth
                      value={rePassword}
                      type="password"
                      onChange={(event) => setRePassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton>
                      <CheckCircleRounded
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          borderRadius: "50%",
                        }}
                        onClick={(e) => {
                          updateChangePassword(e);
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
      </Paper>
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
          <div
            style={{
              width: "700px",
              backgroundColor: "white",
              alignContent: "space-around",
            }}
            className={classes.paper}
          >
            <AppBar position="static" className={classes.header}>
              <Toolbar>
                <Typography variant="h5" className={classes.name}>
                  {name}
                </Typography>
                <Avatar
                  src={profileImageUrl}
                  alt={name}
                  className={classes.avatar}
                />
              </Toolbar>
            </AppBar>
            <div className={classes.banner}>
              <Typography variant="h4" className={classes.bannerText}>
                {headline}
              </Typography>
            </div>
            <Container>
              <form
                onSubmit={(e) => {
                  handleFormSubmit(e, email);
                }}
                className={classes.form}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Name</b>{" "}
                    </label>
                    <TextField
                      placeholder="Name"
                      fullWidth
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Headline</b>{" "}
                    </label>
                    <TextField
                      placeholder="Headline"
                      fullWidth
                      value={headline}
                      onChange={(event) => setHeadline(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>About</b>{" "}
                    </label>
                    <TextField
                      placeholder="About"
                      fullWidth
                      multiline
                      rows={4}
                      value={about}
                      onChange={(event) => setAbout(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Experience</b>{" "}
                    </label>
                    <TextField
                      placeholder="Experience"
                      fullWidth
                      multiline
                      rows={4}
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      {" "}
                      <b>Education</b>{" "}
                    </label>
                    <TextField
                      placeholder="Education"
                      fullWidth
                      multiline
                      rows={4}
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
