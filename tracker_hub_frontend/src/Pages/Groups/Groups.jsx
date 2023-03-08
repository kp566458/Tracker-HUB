import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Container,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import "./CreateGroups.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Groups() {
  const [userDetails, setUserDetails] = useState();
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState("block");
  const classes = useStyles();

  const getCreatedGroups = (email) => {
    axios
      .get(`http://localhost:9092/group/stud/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setGroups(response.data);
          setLoading("none");
          console.log("courses :: ", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    getCreatedGroups(details?.email);
  }, []);

  return (
    <div>
      <Paper>
        <Typography variant="h5" align="center">
          Groups
        </Typography>

        <Loader visibility={loading} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {groups == {} ||
              groups == undefined ||
              groups == "" ||
              groups == null ? (
                <TableRow>
                  <TableCell
                    style={{
                      color: "lightgray",
                      background: "#E5E4E2",
                      height: "60px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                    }}
                    component="th"
                    colSpan={3}
                    scope="row"
                  >
                    <p>No Groups </p>
                  </TableCell>
                </TableRow>
              ) : (
                groups?.map((item, index) => {
                  return (
                    <TableRow key={index} style={{ marginBottom: "10px" }}>
                      <TableCell
                        style={{ width: 160 }}
                        component="th"
                        scope="row"
                      >
                        <b>{item?.groupId}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{item?.groupName}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>Group Memebers: {item?.groupMembers.length}</b>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          className="openButton"
                          href={`groupd/${item?.id}`}
                        >
                          <ArrowRightAltIcon
                            style={{
                              color: "#FFB100",
                              transform: "scale(1.8)",
                            }}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Groups;
