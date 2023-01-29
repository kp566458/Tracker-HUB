import Navbar from "./Pages/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <div className="App" >
      <Navbar/>
      <BrowserRouter>
        <Routes>
        <Route path="/signup" element={<Signup />} />

          </Route>
        </Route>
        <Route path="*"  element={<Notfound />}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
