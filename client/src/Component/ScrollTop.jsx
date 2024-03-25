import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollTop() {
    const {pathname} = useLocation()
    console.log(pathname);
    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname])
  return (null)
}
