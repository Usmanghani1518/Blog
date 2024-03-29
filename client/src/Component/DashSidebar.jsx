import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight ,HiDocumentText ,HiOutlineUserGroup} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useUserSignOut } from "./DashProfile.jsx";
import {useSelector} from "react-redux"
import { BiSolidCommentDetail } from "react-icons/bi";
export default function DashboardSidebar() {
  const location = useLocation();
  const {isAdmin} = useSelector((state)=>state.user.currentUser);
  const handleSignOut = useUserSignOut();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/Dashbord?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={isAdmin?("Admin"):("User")}
              labelColor="dark"
              as={"div"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {isAdmin &&
          <>
          <Link to="/Dashbord?tab=posts">
            <Sidebar.Item
            icon={HiDocumentText}
            active={tab === "posts" }
            className=" cursor-pointer"
            as="div"
            >
             Posts
            </Sidebar.Item>
          </Link>
          <Link to="/Dashbord?tab=users">
            <Sidebar.Item
            icon={HiOutlineUserGroup}
            active={tab === "users" }
            className=" cursor-pointer"
            as="div"
            >
             Users
            </Sidebar.Item>
          </Link>
          <Link to="/Dashbord?tab=comments">
            <Sidebar.Item
            icon={BiSolidCommentDetail}
            active={tab ==="comments"}
            className="cursor-pointer"
            as={"div"}
            >
              Comments
            </Sidebar.Item>
          </Link>
          </>
          }
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignOut}
            className=" cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
