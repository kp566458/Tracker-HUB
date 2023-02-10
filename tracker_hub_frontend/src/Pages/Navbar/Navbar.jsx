import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "./Navbar.css";
import { Button, Link } from "@material-ui/core";

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
}));

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [session, setSession] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("session");
    setSession(loginStatus);
  }, [session]);

  return (
    <div>
      <AppBar position="static" className="appbar_container">
        <Toolbar>
          <Typography variant="h6" className={`${classes.title} appbar_title`}>
            <div
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4345/4345672.png"
                className="university_logo"
                alt="university_logo"
                href="/"
              />{" "}
              Tracker Hub
            </div>
          </Typography>

          <div className="list-menu">
            <ul>
              <li>
                <Link href="/" className="link_tags">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="link_tags">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/allcourses" className="link_tags">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {session === "true" ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className="custom_userIcon"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.setItem("session", false);
                    localStorage.removeItem("userDetails");
                    window.location.reload();
                  }}
                >
                  Sign out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="btn_Section">
              <Button className="login_btn" href="/login">
                Login
              </Button>
              <Button className="signup_btn" href="/signup">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
