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
import Secretkey from "./Pages/Secretavalut/Secretkey";
import Task from "./Pages/Task/Task";
import CourseRequest from "./Pages/CourseRequest/CourseRequest";
import PreviousAssignments from "./Pages/Assignments/PreviousAssignments";
import ViewAssignments from "./Pages/Assignments/ViewAssignments";
import SubmittedAssignments from "./Pages/Assignments/SubmittedAssignments";
import FollowingCourses from "./Pages/Courses/FollowingCourses";
import Profile from "./Pages/Profile/Profile";
import LandingPage from "./Pages/Landing/Landing";
import Landing from "./Pages/Landing/Landing";
import ProtectedRote from "./ProtectedRote";
import EditProfile from "./Pages/Profile/EditProfile";
import AddUser from "./Pages/AddUser/AddUser";
import CourserFollowers from "./Pages/CourseFollowers/CourseFollowers";
import CourseFollowers from "./Pages/CourseFollowers/CourseFollowers";
import ViewProfile from "./Pages/Profile/ViewProfile";
import ViewSingleAssignment from "./Pages/Assignments/ViewSingleAssignment";
import ViewSingleAssignmentStud from "./Pages/Assignments/ViewSingleAssignmentStud";
import SubmittedAssignmentStud from "./Pages/Assignments/SubmittedAssignmentStud";
import AddProfessor from "./Pages/AddUser/AddProfessor";
import Graph from "./Pages/Graph/Graph";
import StudentGrade from "./Pages/StudentGrade/StudentGrade";
import CreateGroup from "./Pages/Groups/CreateGroup";
import Groups from "./Pages/Groups/Groups";
import Group from "./Pages/Groups/Group";
import GroupD from "./Pages/Groups/GroupD";
import ViewSingleSubmittedAssignmentStud from "./Pages/Assignments/ViewSingleSubmittedAssignmentStud";
import ViewSingleSubmitAssignment from "./Pages/Assignments/ViewSingleSubmitAssignment";

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
              <Route path="secretkey" element={<Secretkey />} />
              <Route path="task" element={<Task />} />
              <Route path="courserequest" element={<CourseRequest />} />
              <Route path="previousassignments" element={<PreviousAssignments />} />
              <Route path="viewassignment" element={<ViewAssignments />} />
              <Route path="submittedassignments" element={<SubmittedAssignments />} />
              <Route path="followingcourses" element={<FollowingCourses />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="coursefollowers" element={<CourseFollowers />} />
              <Route path="viewprofile/:useremail" element={<ViewProfile />} />
              <Route path="view_assignment/:id" element={<ViewSingleAssignment />} />
              <Route path="view_submit_assignment/:id" element={<ViewSingleSubmitAssignment />} />
              <Route path="view_assignment_stud/:id" element={<ViewSingleAssignmentStud />} />
              <Route path="view_submit_assignment_stud/:id" element={<ViewSingleSubmittedAssignmentStud />} />
              <Route path="submittedassignmentstud" element={<SubmittedAssignmentStud />} />
              <Route path="addprofessor" element={<AddProfessor />} />
              <Route path="graph" element={<Graph />} />
              <Route path="studentgrades" element={<StudentGrade />} />
              <Route path="creategroup" element={<CreateGroup />} />
              <Route path="groups" element={<Groups />} />
              <Route path="group/:id" element={<Group />} />
              <Route path="groupd/:id" element={<GroupD />} />
          </Route>
        </Route>
        <Route path="*"  element={<Notfound />}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
