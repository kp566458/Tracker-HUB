import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Courses from "./Pages/Courses/Courses";
import CourseDetails from "./Pages/Courses/CourseDetails";
import CreateCourses from "./Pages/Courses/CreateCourses";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/Profile/EditProfile";
import ViewProfile from "./Pages/Profile/ViewProfile";
function App() {
  return (
    <div className="App" >
      <Navbar/>
      <BrowserRouter>
        <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/allcourses/courseDetails/:id" element={<CourseDetails />} />
              <Route path="courses" element={<Courses />} />
              <Route path="createcourses" element={<CreateCourses />} />
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
