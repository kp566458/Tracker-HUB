import { Button, Container, TextField} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from "react-router";
import axios from "axios";

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

export let session = "hello"//(msg) => {
//  console.log("logged in :: ",msg);


function Login() {
  const classes = useStyles();

  const initialValues = {email:"", password:""}
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
      const {name, value } = e.target;
      setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }

    useEffect(() => {
      if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }},[formValues]);

      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if(!values.email) {
          errors.email = "Email is required !";
        } else if(!regex.test(values.email)) {
          errors.email = "This is not a valid email format";
        }

        if(!values.password) {
          errors.password ="Password is required";
        } else if (values.password.length < 6) {
          errors.password ="Password must be more than 6 characters";
        } else if (values.password.length > 10) {
          errors.password ="Password should not be more than 10 characters";
        }
        return errors;
      }

      const URL = "http://localhost:9092/user/login";
      const navigate = useNavigate();
      

      const userLogin = () => {
        const data = {
          email:formValues.email,
          password:formValues.password
        }
        console.log("credentials :",data);
       
        axios.post(URL, data)
        .then((response)=> {
          if(response.status ===200 && response.data.email === formValues.email){
            notify("Logged Succussefully");
            setFormValues({ email: "", password: "" });
            localStorage.setItem("session", true);
            localStorage.setItem("userDetails", JSON.stringify(response.data))
            setTimeout(() => {
              window.location.href ="/dashboard";
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          badNotify(error.response.data);
          setFormValues({ email: "", password: "" });
        })
       
      }

      const goDashboard = (e) => {
        e.preventDefault();
        navigate("/dashboard", {state:{id:1,name:'sabaoon'}})
      }

  return (
    <div className="login-container">
      <Container maxWidth="md" className="main_container">
        <div className="container_items left_item">
          <div className="left_item_mid">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/enter-password-for-login-access-6492554-5402787.png"
              alt=" login_logo"
              className="login_logo"
            />
            <div className="left_item_heading">
              <h1>Login Here</h1>
            </div>
            <p className="link_wrapper">
              <a className="signup_link" href="/signup">
                Don't you have an account ? Sign up here{" "}
              </a>
            </p>
          </div>
        </div>
        <div className="container_items right_item">
          <div className="right_item_form">
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
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline
                    }
                  }}
                  autoComplete="off"
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
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline
                    }
                  }}
                  autoComplete="off"
                />
                <p className="error_messages">{formErrors.password}</p>
              </div>
            </div>
            <div className="input_division_btn">
              <Button
                className="login_btn2"
                onClick={(e)=>{
                  handleSubmit(e);
                    userLogin(e);
                }}
              >
                {" "}
                Login{" "}
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

export default Login;
