import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Loader from "../Loader/Loader";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const bgColor = (percentage) => {
  var col = "";
  if (percentage >= 90 && percentage <= 100) {
    col = `#5FD068`;
  } else if (percentage >= 75 && percentage <= 89) {
    col = `#C6EBC5`;
  } else if (percentage >= 50 && percentage <= 74) {
    col = `#FFEF82`;
  } else if (percentage >= 25 && percentage <= 49) {
    col = `#FD5D5D`;
  } else if (percentage >= 0 && percentage <= 24) {
    col = `#FCC2FC`;
  }
  return col;
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function StudentGrade() {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState("block");

  const APIURL = "http://localhost:9092/sumbitAssignment/prof";
  const GetSubmittedAssignmentDetails = (email) => {
    axios
      .get(APIURL + `/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setLoading("none");
          setRows(response.data);
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
    // setUserDetails(userDetails);
  }, []);

  return (
    <div>
      <Paper style={{padding:10}}>
        <Loader visibility={loading} />
        <Container>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Assignment</StyledTableCell>
                  <StyledTableCell align="center">Student Name</StyledTableCell>
                  <StyledTableCell align="center">Max Score</StyledTableCell>
                  <StyledTableCell align="center">
                    Secured Score
                  </StyledTableCell>
                  <StyledTableCell align="center">Grade</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row?.assignmentId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.messagedBy}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.maxScore}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.score}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        background: bgColor(
                          Math.floor((row?.score / row?.maxScore) * 100)
                        ),
                      }}
                      p={2}
                    >
                      {Math.floor((row?.score / row?.maxScore) * 100)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
    </div>
  );
}

export default StudentGrade;
