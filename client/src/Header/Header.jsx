import React from 'react'
import {Button, Navbar, TextInput, Textarea} from "flowbite-react";
import {AiOutlineSearch} from "react-icons/ai";
import {FaMoon} from "react-icons/fa";
import {Link,useLocation} from "react-router-dom"
export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap dark:text-white font-semibold text-sm sm:text-xl'>
     <span className='px-2 py-1 bg-gradient-to-r from-indigo-600   via-purple-500 to-pink-500 rounded-lg text-white'>Usman's</span>Blog
      </Link>
      <form>
      <TextInput 
      placeholder='Search...'
      rightIcon={AiOutlineSearch}
      className='hidden lg:inline'
      /> </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>
      <div className='flex gap-2 md:order-2'>
      <Button className='w-12 h-10 hidden sm:inline' color='gray' pill><FaMoon/></Button>
      <Link to="/SignIn">
      <Button gradientDuoTone="purpleToBlue" outline>SignIn</Button>
      </Link>
      <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link to="/" as={"div"} active={path==="/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path==="/About"}>
          <Link to="/About">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path==="/Projects"}>
          <Link to="/Projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
