import React, { useEffect, useState } from 'react'
import {Sidebar} from "flowbite-react"
import { HiUser,HiArrowSmRight } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom';
import { useUserSignOut } from './DashProfile.jsx';
export default function DashboardSidebar() {
  const location = useLocation();
  const handleSignOut = useUserSignOut();
  const[tab,setTab] = useState("");
  useEffect(()=>{
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
    
  },[tab])
  return (
  
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to="/Dashbord?tab=profile">
        <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor="dark" as={'div'}>
         Profile
        </Sidebar.Item>

        </Link>
        <Sidebar.Item  icon={HiArrowSmRight} onClick={handleSignOut} className=" cursor-pointer" >
         Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
    </Sidebar>

  )
}
