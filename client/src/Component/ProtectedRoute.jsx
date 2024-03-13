import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
export default function ProtectedRoute() {
    const currentUser = useSelector((state)=>state.user.currentUser)
    console.log(currentUser);
  return currentUser?<Outlet/>:<Navigate to="/SignIn"/>
}
