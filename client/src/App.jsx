import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./Header/Header.jsx";
import Projects from "./pages/Projects.jsx"


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
<Route  path="/" element={<Home/>}/>
<Route path="/about" element={<About/>} />
<Route path="/SignUp" element={<SignUp/>} />
<Route path="/Dashbord" element={<Dashboard/>} />
<Route path="/SignIn" element={<SignIn/>} />
<Route path="/Projects" element={<Projects/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
