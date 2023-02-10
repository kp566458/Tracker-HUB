import React, { useEffect, useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LockIcon from "@material-ui/icons/Lock";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Link } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useLocation } from "react-router-dom";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FolderIcon from "@material-ui/icons/Folder";
import "./Dashboard.css";
import { Grade, Language, LanguageOutlined, PeopleAlt, PersonAdd, PieChart } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "70px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [enabled, setEnabaled] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/dashboard") setEnabaled(true);
    const details = localStorage.getItem("userDetails");
    setUserDetails(JSON.parse(details));
  }, []);

  const firstIcons = [
    <NoteAddOutlinedIcon />,
    <LibraryBooksOutlinedIcon />,
    <VideoLibraryIcon />,
    <DonutLargeIcon />,
  ];
  const icons = [
    <AssignmentIcon />,
    <LockIcon />,
    <VideoLibraryIcon />,
    <LanguageOutlined />,
    <PersonAdd  />,
    <FolderIcon />,
    <AccountCircleIcon />,
    <PieChart />,
    <Grade/>,
    <PeopleAlt />
  ];
  const iconsGroup_2 = [
    <AccountCircleIcon />,
    <SettingsIcon />,
    <FormatListBulletedIcon />,
    <TurnedInIcon />,
    <PieChart />,
    <PeopleAlt />
  ];
  const location = useLocation();

  return (
    <div>
      <div>
        {" "}
        <Button
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
          <Typography variant="h6">Menu</Typography>
        </Button>
      </div>
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Button onClick={handleDrawerClose} className="link_title_header">
              {theme.direction === "ltr" ? (
                <span>
                  <Typography variant="h6" align="center" className="quickLink">
                    {" "}
                    Quick Links <ChevronLeftIcon />{" "}
                  </Typography>
                </span>
              ) : (
                <span>
                  aa <ChevronLeftIcon />
                </span>
              )}
            </Button>
          </div>
          <Divider />
          {userDetails?.role === "Admin" ? (
            <List>
              {["CreateCourses", "Courses", "Add User"].map((text, index) => (
                <ListItem button key={text} className="list_item_link">
                  <ListItemIcon className="list_item_icon">
                    {firstIcons[index]}
                  </ListItemIcon>
                  <Link
                    href={`/dashboard/${text.toLowerCase().replace(/\s/g, "")}`}
                    className="list_link"
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : null}

          <Divider />
          {userDetails?.role === "Professor" ? (
            <List>
              {[
                "Assignment",
                "Previous Assignments",
                "Course Request",
                "Course Followers",
                "Add Professor",
                "Submitted Assignments",
                "Profile",
                "Student Grades",
                "Create Group"
              ].map((text, index) => (
                <ListItem button key={text} className="list_item_link">
                  <ListItemIcon className="list_item_icon">
                    {icons[index]}
                  </ListItemIcon>
                  <Link
                    href={`/dashboard/${text
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                    className="list_link"
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : null}
          <Divider />
          {userDetails?.role === "Student" ? (
            <List>
              {[
                "Profile",
                "Following Courses",
                "View Assignment",
                "Submitted Assignmentstud",
                "Groups"
              ].map((text, index) => (
                <ListItem button key={text} className="list_item_link">
                  <ListItemIcon className="list_item_icon">
                    {iconsGroup_2[index]}
                  </ListItemIcon>
                  <Link
                    href={`/dashboard/${text
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                    className="list_link"
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : null}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div style={{ marginTop: 0 }} />
          {enabled && <Outlet />}
          {!enabled && (
            <>
              <div className={classes.root}>
                {userDetails?.role === "Admin" ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5">
                          Welcome to the Dashboard
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Courses Created
                        </Typography>
                        <Typography variant="body1">6</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Professors Registered
                        </Typography>
                        <Typography variant="body1">5</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Students Registered
                        </Typography>
                        <Typography variant="body1">120</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">Others</Typography>
                        <Typography variant="body1">0</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : userDetails?.role === "Professor" ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5">
                          Welcome to the Dashboard
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Courses Allotted
                        </Typography>
                        <Typography variant="body1">3</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No of Assignments Released
                        </Typography>
                        <Typography variant="body1">2</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          Total No. of Student Registred{" "}
                        </Typography>
                        <Typography variant="body1">65</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Student for Courses Accesses Wait List
                        </Typography>
                        <Typography variant="body1">12</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : userDetails?.role === "Student" ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5">
                          Welcome to the Dashboard
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">Following Courses</Typography>
                        <Typography variant="body1">2</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">
                          No. of Assignments Submitted
                        </Typography>
                        <Typography variant="body1">2</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">Grade</Typography>
                        <Typography variant="body1">A</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">Rejected Courses</Typography>
                        <Typography variant="body1">0</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : null}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
