import { useState } from 'react';
import { AppBar, Button, Container, Grid, Toolbar, Typography, Avatar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const data = {
    name: 'John Doe',
    headline: 'Software Developer',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    experience: [
      {
        company: 'Acme Inc.',
        title: 'Software Engineer',
        date: 'Jan 2020 - Present',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        company: 'XYZ Corp.',
        title: 'Front-end Developer',
        date: 'Jun 2018 - Dec 2019',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ],
    education: [
      {
        institution: 'University of ABC',
        degree: 'Bachelor of Science in Computer Science',
        date: 'Sep 2014 - Jun 2018'
      }
    ],
    profileImageUrl: 'https://via.placeholder.com/150',
    backgroundImageUrl: 'https://via.placeholder.com/800x400'
  };
  
  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(3)
    },
    banner: {
      backgroundImage: `url(${data.backgroundImageUrl})`,
      backgroundSize: 'cover',
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }
    },
    bannerText: {
      color: theme.palette.common.white,
      zIndex: 2,
      textAlign: 'center'
    },
    name: {
      flexGrow: 1
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      margin: `-${theme.spacing(10)}px 0 ${theme.spacing(3)}px`,
      border: `5px solid ${theme.palette.common.white}`,
      position: 'relative',
      zIndex: 2
    },
    form: {
      margin: theme.spacing(3)
    }
  }));
  function EditProfile() {
    const classes = useStyles();
    const [name, setName] = useState(data.name);
    const [headline, setHeadline] = useState(data.headline);
    const [about, setAbout] = useState(data.about);
    const [profileImageUrl, setProfileImageUrl] = useState(data.profileImageUrl);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(data.backgroundImageUrl);
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log({ name, headline, about, profileImageUrl, backgroundImageUrl });
    };
  
    return (
      <div>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
          <Typography variant="h5" className={classes.name}>
            {name}
          </Typography>
          <Avatar src={profileImageUrl} alt={name} className={classes.avatar} />
          <Button variant="contained" color="secondary">
            Edit Profile
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.banner}>
        <Typography variant="h4" className={classes.bannerText}>
          {headline}
        </Typography>
      </div>
      <Container>
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Headline"
                fullWidth
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="About"
                fullWidth
                multiline
                rows={4}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Profile Image URL"
                fullWidth
                value={profileImageUrl}
                onChange={(event) => setProfileImageUrl(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Background Image URL"
                fullWidth
                value={backgroundImageUrl}
                onChange={(event) => setBackgroundImageUrl(event.target.value)}
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
  );
}

export default EditProfile;
