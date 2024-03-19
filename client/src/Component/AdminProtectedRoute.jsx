import { Outlet,Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import React from 'react'

export default function AdminProtectedRoute() {
    const currentUser = useSelector((state)=>state.user.currentUser)
  return (
    currentUser && currentUser.isAdmin ?(<Outlet/>): <Navigate to="/signIn"/>
  )
}
