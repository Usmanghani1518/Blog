import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./Component/Header.jsx";
import Projects from "./pages/Projects.jsx";
import FooterCom from "./Component/FooterCom.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import AdminProtectedRoute from "./Component/AdminProtectedRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Update from "./pages/update.jsx";
import Post from "./pages/Post.jsx";
import ScrollTop from "./Component/ScrollTop.jsx";
import Search from "./pages/Search.jsx";
import SignInIs from "./Component/SignInIs.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollTop/>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Dashbord" element={<Dashboard />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/search" element={<Search/>}/>
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<Update />} />
          </Route>
          <Route path="/post/:postSlug" element={ <Post/>}/>
          <Route element={<SignInIs/>}>

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          </Route>
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  );
}

export default App;
