import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function SignInIs() {
    const user = useSelector((state)=>state.user.currentUser)
    console.log(user);
  return (

    user?<Navigate to={"/"}/>:<Outlet/>
  )
}
