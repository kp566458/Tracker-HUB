import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { useParams } from "react-router";
import { AccountCircle } from "@material-ui/icons";
import Moment from "react-moment";

import CanvasJSReact from '../../canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Group() {
  const { id } = useParams();
  const [reply, setReply] = useState();
  const [messageVisibility, setMessageVisibility] = useState("none");
  const [messages, setMessages] = useState();
  const taskRef = useRef(null);
  const [description, setDescription] = useState();
  const [userDetails, setUserDetails] = useState();
  const [group, setGroup] = useState();
  const [groupDiscussions, setGroupDiscussions] = useState();
  const classes = useStyles();

  const initialValues = {
    description: "",
    attachments: [],
  };
  const [formValues, setFormValues] = useState(initialValues);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
     
    }
  };

  const getGroupDiscussion = (groupId) => {
    axios
      .get(`http://localhost:9092/group/discussion/${groupId}`)
      .then((response) => {
        if (response.status == 200) {
          setGroupDiscussions(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nameCounts = groupDiscussions?.reduce((accumulator, item) => {
    if (accumulator[item?.messagedBy]) {
      accumulator[item?.messagedBy] += 1;
    } else {
      accumulator[item?.messagedBy] = 1;
    }
    return accumulator;
  }, {});

  var val = [];
  if (nameCounts != null) {
    const nameCountsArray = Object.keys(nameCounts)?.map((name) => ({
      name,
      count: nameCounts[name],
    }));
    val = nameCountsArray;
  }
  var excludeNames = [userDetails?.email];

  var filteredData = val.filter(function (item) {
    return excludeNames.indexOf(item.name) === -1;
  });
  var dataPoints = filteredData.map(function (item) {
    return { label: item.name, y: item.count };
  });

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      text: "Group Member Discussions",
      fontSize: 18,
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: dataPoints
    }]
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files && e.target.files.length > 0) {
      let newFiles = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          newFiles.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setFormValues({
        attachments: newFiles
      })
    }
  };

  const getGroupMembers = async (Id) => {
    try {
      const response = await axios.get(`http://localhost:9092/group/prof/${Id}/members`);
        if(response.status == 200) {
            setGroup(response.data);
            getGroupDiscussion(response.data.groupId);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      groupId: group?.groupId,
      description: editorRef.current ? editorRef.current.getContent() : "",
      messagedBy: userDetails?.email,
      attachments: formValues?.attachments,
    };
    axios
      .post("http://localhost:9092/group/discussion", data)
      .then((response) => {
        if (response.status == 200) {
          alert("successfully posted");
          console.log(response.data);
          editorRef.current.setContent("");
          setFormValues({
            description: "",
            attachments: [],
          });
          getGroupDiscussion(group?.groupId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(details);
    getGroupMembers(id);
  }, []);


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper
            className={classes.paper}
            style={{ padding: "10px", marginBottom: "10px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              {" "}
              <b>Discussion</b> <Divider />
            </h3>
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onChange={handleChange}
              init={{
                height: 130,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
               <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                className="courseFormInput"
              >
                <label htmlFor="attachments" className="courseLabels">
                  {" "}
                  Attachments{" "}
                </label>
                <input
                  type="file"
                  className="multipleFile_Upload"
                  multiple
                  id="attachments"
                  placeholder="Attachments"
                  variant="outlined"
                  name="attachments"
                  accept="*"
                  onChange={handleChange}
                />
              </Grid>
            <div className="course_submit_button">
              <Button
                onClick={(e) => {                  
                  log();
                  handleSubmit(e);
                }}
                className="follow_btn "
              >
                <SendIcon /> &nbsp; send
              </Button>
            </div>
            <Box sx={{ m: 4 }}>
              <Divider />
            </Box>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              {groupDiscussions?.map((discussion, index) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                    }}
                    key={index}
                  >
                    <span style={{ fontSize: "9px", marginLeft: "05px" }}>
                      {discussion?.messagedBy == userDetails?.email
                        ? "You"
                        : discussion?.messagedBy}{" "}
                      &nbsp; &nbsp;{" "}
                      <Moment format="DD-MM-YYYY | hh:mm:ss a">
                        {discussion?.date}
                      </Moment>
                    </span>
                    <div
                      style={{
                        background:
                          `${discussion?.messagedBy}` == `${userDetails?.email}`
                            ? "#F0EEED"
                            : "#BDCDD6",
                        padding: 10,
                        borderRadius: "5px",
                        // display: "flex",
                        border: "1px solid",
                        marginBottom: '8px'
                      }}
                    >
                      <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${discussion?.description}`,
                        }}
                      />
                      </div>
                      <Divider />
                      <div>
                      {discussion?.attachments?.map((ping, index) => {
                      return (
                        <span key={index}>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              window.open(ping);
                              if (
                                ping.includes("jpg") ||
                                ping.includes("png") ||
                                ping.includes("image/jpeg")
                              ) {
                                let win = window.open("about:blank");
                                let image = new Image();
                                image.src = ping;
                                setTimeout(() => {
                                  win.document.write(image.outerHTML);
                                }, 0);
                              }
                              if (ping.includes("application/pdf")) {
                                window.open(ping);
                              }
                            }}
                          >
                            {ping.includes("jpg") || ping.includes("png") ? (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                                height="30px"
                                alt="IMAGE"
                              />
                            ) : ping.includes("pdf") ? (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                height="30px"
                                alt="PDF"
                              />
                            ) : null}
                          </Button>
                        </span>
                      );
                    })}
                      </div>
                    </div>
                   
                  </div>
                );
              })}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant={"h6"} align="center">
              Group Members
            </Typography>
              <Divider />
            <Box m={5}>
              {group?.groupMembers.map((person, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                      margin: "5px",
                    }}
                  >
                     <AccountCircle /> &nbsp; &nbsp; {person}
                  </Grid>
                );
              })}
            </Box>
          </Paper>
          
          <Paper>
          <CanvasJSChart options = {options}/>
          </Paper>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default Group;
