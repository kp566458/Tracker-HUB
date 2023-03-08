import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Loader from "../Loader/Loader";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SubmittedAssignmentStud() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState();
  const [userDetails, setUserDetails] = useState();
  const [submittedAssignments, setSubmittedAssignments] = useState();
  const [loading, setLoading] = useState("block");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const APIURL = "http://localhost:9092/sumbitAssignment/student";
  const GetSubmittedAssignmentDetails = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setLoading("none");
          setSubmittedAssignments(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    GetSubmittedAssignmentDetails(userDetails?.email);
    setUserDetails(userDetails);
  }, []);

  return (
    <div>
      <Paper>
        <Typography variant="h4" align="center">
          Submitted Assignment
        </Typography>

        <Loader visibility={loading} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {submittedAssignments == {} ||
              submittedAssignments == undefined ||
              submittedAssignments == "" ||
              submittedAssignments == null ? (
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
                    <p>No Submitted Assignment</p>
                  </TableCell>
                </TableRow>
              ) : (
                submittedAssignments?.map((item, index) => {
                  return (
                    <TableRow key={index} style={{ marginBottom: "10px" }}>
                      <TableCell
                        style={{ width: 160 }}
                        component="th"
                        scope="row"
                      >
                        <b>{item?.assignmentId}</b>
                      </TableCell>
                      <TableCell align="left">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${item?.description}`,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <b>Score: {item?.score}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{item?.score > 0 ? "Verified" : "Not Verified"}</b>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          className="openButton"
                          href={`view_submit_assignment_stud/${item?.assignmentId}`}
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

export default SubmittedAssignmentStud;
