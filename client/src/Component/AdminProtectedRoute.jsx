import { Outlet,Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import React from 'react'
export default function AdminProtectedRoute() {
    const currentUser = useSelector((state)=>state.user.currentUser)
    let a =14;
    a=15
    
  return (
    currentUser && currentUser.isAdmin ?(<Outlet/>): <Navigate to="/signIn"/>
  )
}
