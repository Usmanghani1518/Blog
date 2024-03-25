import { Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection() {
    const user = useSelector((state)=>state.user.currentUser);
    const [comment,setComment] = useState("")
   const handleSubmit = async(e)=>{
    e.preventDefault();
   }
  return (
    <div className="max-w-2xl w-full mx-auto">
   {user?(<div className='flex items-center gap-1 my-5 text-gray-500'>
    <p>Signed in as:</p>
    <img className='w-7 h-7 rounded-full' src={user.avatar} alt="" />
    <Link className='text-teal-400 hover:underline' to="/Dashbord?tab=profile">@{user.username}</Link>
   </div>):(<div>
    Your must loged in to Comment the post
   </div>)}
   {
    user && (
        <div className=''>
            <form onSubmit={handleSubmit} className='border-2 rounded-md p-4 border-teal-400 '>
            <Textarea rows={3} maxLength={200} onChange={(e)=>setComment(e.target.value)} placeholder='Enter your comment Here .....'/>
            <div className='flex justify-between my-4'>
            <p>{200 - comment.length} Reamining Letters</p>
            <Button gradientDuoTone="purpleToBlue"outline type='submit'>Submit</Button>
            </div>
            </form>
        </div>
    )
   }
   </div>
  )
}
