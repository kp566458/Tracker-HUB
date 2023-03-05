import { Button, Container, TextField, Typography } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import "./Secretkey.css";

const useStyles = makeStyles(theme => ({
    textFieldLabelFocused:{},
    textFieldRoot: {
      "&:hover": {
        color: `#000000 !important`,
      },
      "&:hover $textFieldNotchedOutline" :{
        borderColor: `#000000 !important`,
      },
      "&$textFieldFocused $textFieldNotchedOutline" :{
        borderColor: `#000000 !important`,
      }
    }, 
    textFieldNotchedOutline:{},
    textFieldFocused:{}
  }));

function Secretkey() {

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" align="center">
        Secret Key Generate
      </Typography>
      <Container style={{ textAlign: "center", marginTop:"50px" }}>
        <div>
          <label htmlFor="" className="GeneratekeyLabel">Generate Secretkey</label>
        </div>
        <div>
          <TextField variant="outlined" InputProps={{
                    classes:{
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline
                    }
                  }} className="GenerateKeyInput"/>{" "}
          <Button className="clipIcon">
            <FileCopy />
          </Button>
        </div>
        <div>
        <Button className="GenerateKey">
            Generate Key
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Secretkey;
