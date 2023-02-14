import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contactus from "./Pages/Contact_us/Contactus";
import Courses from "./Pages/Courses/Courses";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Notfound from "./Pages/NotFound/Notfound";
import AllCourses from "./Pages/Courses/AllCourse";
import CourseDetails from "./Pages/Courses/CourseDetails";
import CreateCourses from "./Pages/Courses/CreateCourses";
import CourseRequest from "./Pages/CourseRequest/CourseRequest";
import Profile from "./Pages/Profile/Profile";
import LandingPage from "./Pages/Landing/Landing";
import Landing from "./Pages/Landing/Landing";
import ProtectedRote from "./ProtectedRote";
import EditProfile from "./Pages/Profile/EditProfile";
import ViewProfile from "./Pages/Profile/ViewProfile";

function App() {
  return (
    <div className="App" >
      <Navbar/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/allcourses/courseDetails/:id" element={<CourseDetails />} />
          <Route element={<ProtectedRote />}>
            <Route path="/dashboard" exact element={<Dashboard />}>
              <Route path="courses" element={<Courses />} />
              <Route path="createcourses" element={<CreateCourses />} />
              <Route path="secretkey" element={<Secretkey />} />
              <Route path="task" element={<Task />} />
              <Route path="courserequest" element={<CourseRequest />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="viewprofile/:useremail" element={<ViewProfile />} />
          </Route>
        </Route>
        <Route path="*"  element={<Notfound />}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
