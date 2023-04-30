import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./Courses.css";

import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function CreateCourses() {
  const [description, setDescription] = useState();
  const [selectedImage, setSelectedImage] = useState();

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
    courseName: "",
    courseDuration: "",
    professorName: "",
    uploadFile: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [userDetails, setUserDetails] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log("real : ", real);
  };

  const APIURL = "http://localhost:9092/course/";

  const addCourse = (e) => {
    e.preventDefault();
    const data = {
      courseName: formValues.courseName,
      courseDuration: formValues.courseDuration,
      professorName: formValues.professorName,
      courseContent: real,
    };
    const ApiFile = {
      file: selectedImage,
    };
    console.log("credentials :", data);
    const formData = new FormData();
    formData.append("course", JSON.stringify(data));
    formData.append("file", selectedImage);
    axios({
      method: "post",
      url: APIURL,
      data: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          notify("Added Succussefully");
          setFormValues({
            courseName: "",
            courseDuration: "",
            professorName: "",
            description: "",
            uploadFile: "",
          });
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({ email: "", password: "", username: "", role: "" });
        editorRef.current.setContent("");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:9092/user/professors")
      .then((response) => {
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setUserDetails(error.response.data);
      });
  }, []);

  return (
    <Paper>
      <div className="CreateCourse_Container">
        <Container maxWidth="lg">
          <Typography variant="h4" align="center">
            Create Courses
          </Typography>
          <Grid
            container
            className="CreateCourse_GridContainer"
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {userDetails === "No Professor Found." ? (
              <Typography variant="h5" align="center">
                No Professor Found.
              </Typography>
            ) : (
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
                        CourseName{" "}
                      </label>
                      <TextField
                        id="courseName"
                        placeholder="Course Name"
                        variant="outlined"
                        name="courseName"
                        value={formValues.courseName}
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
                        Course Duration{" "}
                      </label>
                      <TextField
                        id="courseDuration"
                        placeholder="Course Duration"
                        variant="outlined"
                        name="courseDuration"
                        value={formValues.courseDuration}
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
                      <label for="professorName" className="courseLabels">
                        {" "}
                        Professor Name{" "}
                      </label>
                      <TextField
                        id="professorName"
                        placeholder="Professor Name"
                        variant="outlined"
                        name="professorName"
                        value={formValues.professorName}
                        onChange={handleChange}
                        select
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Please select professor to assign"
                        autoComplete="off"
                      >
                        <option key="" value="">
                          {" "}
                          -- Select Professor --{" "}
                        </option>
                        {userDetails?.map((item, index) => {
                          return (
                            <option key={index} value={item.email}>
                              {" "}
                              {item.username}{" "}
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
                      <label for="professorName" className="courseLabels">
                        {" "}
                        Upload Image{" "}
                      </label>
                      <TextField
                        type="file"
                        id="professorName"
                        placeholder="Professor Name"
                        variant="outlined"
                        name="uploadFile"
                        value={formValues.uploadFile}
                        accept="image/*"
                        multiple
                        value={formValues.uploadFile}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={3} md={3} lg={3} sm={3}>
                    <Typography variant="h6" align="center">
                      Image Preview
                    </Typography>
                    {selectedImage && (
                      <img
                        className="previewImage"
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                      />
                    )}
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
                        // handleSubmit(e);
                        addCourse(e);
                      }}
                      className="follow_btn "
                    >
                      save course
                    </Button>
                  </div>
                </Grid>
              </form>
            )}
          </Grid>
        </Container>
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
    </Paper>
  );
}

export default CreateCourses;
