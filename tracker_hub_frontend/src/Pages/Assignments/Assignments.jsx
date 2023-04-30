import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Assignment.css";

const Assignments = () => {
  var real = "";
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("description : ", editorRef.current.getContent());
      real = editorRef.current.getContent();
      setDescription(editorRef.current.getContent());
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const badNotify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const initialValues = {
    courseId: "",
    daysCount: "",
    maxScore: "",
    title: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [description, setDescription] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [attachments, setAttachments] = useState([]);

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
      setAttachments(newFiles);
    }
  };

  const APIURL2 = "http://localhost:9092/assignment/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attachments.length > 0) {
      const dataObj = {
        courseId: formValues.courseId,
        title: formValues.title,
        daysCount: formValues.daysCount,
        description: real,
        profEmail: userDetails?.email,
        maxScore: formValues.maxScore,
        attachments: attachments,
      };
      axios({
        method: "post",
        url: APIURL2,
        data: dataObj,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 201) {
            notify(response.data);
            setFormValues({
              courseId: "",
              daysCount: "",
              description: "",
              attachments: "",
              title: "",
              attachments: [],
              maxScore: "",
            });
            editorRef.current.setContent("");
            setSelectedFiles({});
            editorRef.current.setContent("");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          badNotify(error.response.data);
          setFormValues({
            courseId: "",
            daysCount: "",
            description: "",
            attachments: "",
            title: "",
            attachments: [],
            maxScore: "",
          });
          setSelectedFiles({});
          editorRef.current.setContent("");
        });
    }
  };

  const APIURL = "http://localhost:9092/course/CourseCollections";

  const GetCourseDetails = () => {
    axios
      .get(APIURL)
      .then((response) => {
        if (response.status === 200) {
          setCourseDetails(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
      });
  };

  useEffect(() => {
    GetCourseDetails();
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  return (
    <div>
      <Paper>
      <Typography variant="h3" align="center">
        Create Assignment
      </Typography>
      <Grid
        container
        className="CreateCourse_GridContainer"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <form noValidate autoComplete="off">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sm={12}
            style={{ display: "flex" }}
          >
            <Grid xs={9} md={9} lg={9} sm={9}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                justifyContent="center"
                alignItems="center"
                className="courseFormInput"
              >
                <label for="courseName" className="courseLabels">
                  {" "}
                  CourseId{" "}
                </label>
                <TextField
                  id="courseId"
                  placeholder="Course Id"
                  variant="outlined"
                  name="courseId"
                  className="input_field"
                  select
                  value={formValues.courseId}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select course"
                  autoComplete="off"null
                >
                  <option key="" value="">
                    {" "}
                    -- Select Course --{" "}
                  </option>
                  {courseDetails === undefined
                    ? null
                    : courseDetails?.map((item, index) => {
                        return (
                          <option key={item?.courseId} value={item?.courseId}>
                            {" "}
                            {item?.courseId} - {item?.courseName}{" "}
                          </option>
                        );
                      })}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                alignItems="center"
                className="courseFormInput"
              >
                <label for="title" className="courseLabels">
                  {" "}
                  Title{" "}
                </label>
                <TextField
                  id="title"
                  placeholder="title"
                  variant="outlined"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                alignItems="center"
                className="courseFormInput"
              >
                <label for="courseDuration" className="courseLabels">
                  {" "}
                  No of Days{" "}
                </label>
                <TextField
                  id="No. of Days"
                  placeholder="No. of Days"
                  variant="outlined"
                  name="daysCount"
                  value={formValues.daysCount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                alignItems="center"
                className="courseFormInput"
              >
                <label for="courseDuration" className="courseLabels">
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
                  value={formValues.attachments}
                  accept="*"
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sm={12}
                alignItems="center"
                className="courseFormInput"
              >
                <label for="courseDuration" className="courseLabels">
                  {" "}
                  Max Score{" "}
                </label>
                <TextField
                  id="max Score"
                  placeholder="Max Score"
                  variant="outlined"
                  name="maxScore"
                  value={formValues.maxScore}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sm={12} alignItems="center">
            <label for="description" className="courseLabels">
              {" "}
              Description{" "}
            </label>
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 400,
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
            <div className="course_submit_button">
              <Button
                onClick={(e) => {
                  log();
                  handleSubmit(e);
                }}
                className="follow_btn "
              >
                save course
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
        </Paper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Assignments;
