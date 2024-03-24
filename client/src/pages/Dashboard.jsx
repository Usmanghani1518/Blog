import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import DashboardSidebar from "../Component/DashSidebar.jsx";
import DashProfile from "../Component/DashProfile.jsx";
import DashPost from "./DashPost.jsx";
import DsahUser from "./DsahUser.jsx";

function Dashboard() {
  const location = useLocation()
  const[tab,setTab] = useState("");
  useEffect(()=>{
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
    
  },[location.search])
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar of dashboard */}
        <DashboardSidebar/>
      </div>
      {/* profile and other ... */}
      {tab==="profile" && <DashProfile/>}
      {tab==="posts" && <DashPost/>}
      {tab==="users" && <DsahUser/>}

    </div>
  )
}

export default Dashboard