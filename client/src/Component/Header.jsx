import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun } from "react-icons/fa";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {toggleTheme} from "../redux/theme/themeSlicer.js"
import { useUserSignOut } from "./DashProfile.jsx";
import { FaUserCircle } from "react-icons/fa";
import HeadRoom from "react-headroom"

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const {theme} = useSelector((state)=>state.theme)
  const[searchTerm,setSearchTerm] = useState("")
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch,setShowSearch] = useState("hidden")

  // this is for the load the search data 
   useEffect(()=>{
    const urlPrams=new  URLSearchParams(location.search);
    const searchTermUrl = urlPrams.get("searchTerm")
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl)
    }
   },[location.search])
   // for submit the search data to server and get its infromation
   const handleSubmitSearch = (e)=>{
    e.preventDefault();
    const urlPrams = new URLSearchParams(location.search);
      urlPrams.set("searchTerm",searchTerm)
      const serchQuery =urlPrams.toString()
      navigate(`/search?${serchQuery}`)
   }
  const hadleSignOut = useUserSignOut()
const handleClick = ()=>{
console.log("how are you bab");
return 
}
document.addEventListener("click",handleClick)


  return (
    <HeadRoom>
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap dark:text-white font-semibold text-sm sm:text-xl"
      >
        <span className="px-2   py-1 bg-gradient-to-r from-indigo-600   via-purple-500 to-pink-500 rounded-lg text-white">
          Usman's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmitSearch}>
        <TextInput
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className={`${showSearch} lg:inline `}
          onChange={(e)=>setSearchTerm(e.target.value)}
          
          value={searchTerm}
        />{" "}
      </form>
      <Button type="submit" onClick={()=>setShowSearch("")} className="w-12 h-10 lg:hidden " color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={()=>dispatch(toggleTheme())}>
          {
            theme==="light"?(<FaMoon />):(<FaSun/>)
          }
          
        </Button>
        {currentUser ? (
          <Dropdown
            inline
            label={currentUser.avatar?(<Avatar className="bg-gray-300 rounded-full" alt="Usr" img={currentUser.avatar} rounded  />):(<FaUserCircle/>)}
          >
            <Dropdown.Header className="">
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate font-medium text-sm">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/Dashbord?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={hadleSignOut}>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to="/SignIn">
            <Button gradientDuoTone="purpleToBlue" outline>
              SignIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link to="/" as={"div"} active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/About"}>
          <Link to="/About">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/Projects"}>
          <Link to="/Projects">Write For Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </HeadRoom>
  );
}
