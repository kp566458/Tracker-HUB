import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contactus from "./Pages/Contact_us/Contactus";
import Courses from "./Pages/Courses/Courses";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Assignments from "./Pages/Assignments/Assignments";
import Notfound from "./Pages/NotFound/Notfound";
import AllCourses from "./Pages/Courses/AllCourse";
import CourseDetails from "./Pages/Courses/CourseDetails";
import CreateCourses from "./Pages/Courses/CreateCourses";
import Task from "./Pages/Task/Task";
import CourseRequest from "./Pages/CourseRequest/CourseRequest";
import PreviousAssignments from "./Pages/Assignments/PreviousAssignments";
import ViewAssignments from "./Pages/Assignments/ViewAssignments";
import FollowingCourses from "./Pages/Courses/FollowingCourses";
import Profile from "./Pages/Profile/Profile";
import LandingPage from "./Pages/Landing/Landing";
import Landing from "./Pages/Landing/Landing";
import ProtectedRote from "./ProtectedRote";
import EditProfile from "./Pages/Profile/EditProfile";
import CourserFollowers from "./Pages/CourseFollowers/CourseFollowers";
import CourseFollowers from "./Pages/CourseFollowers/CourseFollowers";
import ViewProfile from "./Pages/Profile/ViewProfile";
import ViewSingleAssignmentStud from "./Pages/Assignments/ViewSingleAssignmentStud";

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
        
          <Route path="/assignment" element={<Assignments />} />
          <Route path="/allcourses/courseDetails/:id" element={<CourseDetails />} />
          <Route element={<ProtectedRote />}>
            <Route path="/dashboard" exact element={<Dashboard />}>
              <Route path="assignment" element={<Assignments />} />
              <Route path="courses" element={<Courses />} />
              <Route path="createcourses" element={<CreateCourses />} />
              <Route path="courserequest" element={<CourseRequest />} />
              <Route path="previousassignments" element={<PreviousAssignments />} />
              <Route path="viewassignment" element={<ViewAssignments />} />
              <Route path="followingcourses" element={<FollowingCourses />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="coursefollowers" element={<CourseFollowers />} />
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
