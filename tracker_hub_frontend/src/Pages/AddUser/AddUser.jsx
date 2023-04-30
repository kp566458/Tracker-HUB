import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../Signup/Signup.css";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  textFieldLabelFocused: {},
  textFieldRoot: {
    "&:hover": {
      color: `#000000 !important`,
    },
    "&:hover $textFieldNotchedOutline": {
      borderColor: `#000000 !important`,
    },
    "&$textFieldFocused $textFieldNotchedOutline": {
      borderColor: `#000000 !important`,
    },
  },
  textFieldNotchedOutline: {},
  textFieldFocused: {},
}));

function AddUser() {
  const classes = useStyles();
  const initialValues = { username: "", email: "", password: "", role: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "UserName is required !";
    }

    if (!values.email) {
      errors.email = "Email is required !";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password should not be more than 10 characters";
    }
    return errors;
  };
  const URL = "http://localhost:9092/user/signup";

  const userSignup = (e) => {
    e.preventDefault();
    const data = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
    };
    console.log("credentials :", data);

    axios
      .post(URL, data)
      .then((response) => {
        if (response.status === 201) {
          notify("User Added Succussefully");
          setFormValues({ email: "", password: "", username: "", role: "" });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        badNotify(error.response.data);
        setFormValues({ email: "", password: "", username: "", role: "" });
      });
  };

  return (
    <div className="login-container">
      <Container maxWidth="md" className="main_container">
        <div className="container_items right_item">
          <div className="right_item_form">
            <div className="input_division">
              <p className="form_label">UserName</p>
              <div>
                <TextField
                  id="outlined-basic"
                  className="input_field"
                  variant="outlined"
                  placeholder="UserName"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  autoComplete="off"
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                />
                <p className="error_messages">{formErrors.username}</p>
              </div>
            </div>
            <div className="input_division">
              <p className="form_label">Email</p>
              <div>
                <TextField
                  id="outlined-basic"
                  className="input_field"
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  autoComplete="off"
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                />
                <p className="error_messages">{formErrors.email}</p>
              </div>
            </div>
            <div className="input_division">
              <p className="form_label">Password</p>
              <div>
                <TextField
                  id="outlined-basic"
                  className="input_field"
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  autoComplete="off"
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                />
                <p className="error_messages">{formErrors.password}</p>
              </div>
            </div>
            <div className="input_division">
              <p className="form_label">Assign Role</p>
              <div>
                <TextField
                  id="outlined-basic"
                  className="input_field"
                  variant="outlined"
                  placeholder="UserName"
                  select
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your role "
                  autoComplete="off"
                >
                  <option key="" value="">
                    {" "}
                    -- Select Role --{" "}
                  </option>
                  <option key="Admin" value="Admin">
                    {" "}
                    Admin{" "}
                  </option>
                  <option key="Professor" value="Professor">
                    {" "}
                    Professor{" "}
                  </option>
                  <option key="Student" value="Student">
                    {" "}
                    Student{" "}
                  </option>
                </TextField>
                <p className="error_messages">{formErrors.role}</p>
              </div>
            </div>
            <div className="input_division_btn">
              <Button
                className="login_btn2"
                onClick={(e) => {
                  handleSubmit(e);
                  userSignup(e);
                }}
              >
                {" "}
                Add User{" "}
              </Button>
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
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddUser;
