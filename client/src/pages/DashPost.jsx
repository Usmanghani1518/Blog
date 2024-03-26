import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { PiWarningBold } from "react-icons/pi";
import { Button, Modal, Table} from "flowbite-react"
import {Link} from "react-router-dom"
export default function DashPost() {
  const user = useSelector((state)=>state.user.currentUser)
  const [posts, setPosts] = useState([])
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [postId,setPostId] = useState(null)
 
  useEffect(()=>{
    const showPost = async()=>{
      const res = await fetch(`/api/post/getpost?userId=${user._id}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.post)
      }
      if (data.post.length <9 ) {
        setShowMore(false)
      }
      if (!res.ok) {
        console.log("there is an error in your posts");
      }

    }
    showPost()
  },[])
  const handleShowMore = async ()=>{
    const startIndex = posts.length
    const res = await fetch(`/api/post/getpost/?userId=${user._id}&startIndex=${startIndex}`);
    const data = await res.json();
    if (res.ok) {
      setPosts([...posts,...data.post])
      if (data.post.length <9) {
        setShowMore(false)
      }

    }
  }
  const handleDelete = async ()=>{
    const res = await fetch(`/api/post/delete-post/${postId}/${user._id}`,{
      method:"DELETE"
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res.message);
    }
   if (res.ok) {
   const updatedPost= posts.filter((item)=>item._id !== postId)
   console.log(updatedPost);
   setPosts(updatedPost);
   setShowModal(false)
   }
  }
  return (
    <>
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500'>
    <Table hoverable className='shadow-md' >
    <Table.Head>
      <Table.HeadCell>Date Updated</Table.HeadCell>
      <Table.HeadCell>Post Image</Table.HeadCell>
      <Table.HeadCell>Post Tittle</Table.HeadCell>
      <Table.HeadCell>Category</Table.HeadCell>
      <Table.HeadCell>Edit</Table.HeadCell>
      <Table.HeadCell>Delete</Table.HeadCell>
    </Table.Head>
      {
        posts.map((data)=>
    <Table.Body key={data._id} className="divide-y">
      <Table.Row  className=' bg-white dark:border-gray-700 dark:bg-gray-800' >
        <Table.Cell>{new Date(data.updatedAt).toLocaleDateString()}</Table.Cell>
           <Table.Cell className=' cursor-pointer'> <Link to={`/post/${data.slug}`}><img src={data.postImg} className='h-10 w-20 object-cover bg-gray-500'  alt="" /></Link></Table.Cell> 
            <Table.Cell><Link className=' font-medium text-gray-900 dark:text-gray-200 ' to={`/post/${data.slug}`}>{data.tittle}</Link></Table.Cell>
            <Table.Cell>{data.category}</Table.Cell>
            <Table.Cell> <Link className=' text-teal-400 hover:underline font-medium' to={`/update-post/${data._id}`}> <span>Edit</span></Link></Table.Cell>
            <Table.Cell><span onClick={()=>{setShowModal(true); setPostId(data._id)}} className=' text-red-500 cursor-pointer hover:underline font-medium'>Delete</span></Table.Cell>
      </Table.Row>
    </Table.Body>
    )}

    </Table>
    {   showMore && (
      <button onClick={handleShowMore} className='text-teal-400 py-7 w-full self-center text-sm'>Show More</button>
    )}

    <Modal show={showModal} onClose={()=>setShowModal(false)} popup size={"md"}>
      <Modal.Header/>
      <Modal.Body>
        <div>
        <PiWarningBold className=' text-yellow-200 text-5xl w-full self-center' />
        <p className='text-gray-500 text-center py-3'>You Confirm to Delete this Post</p>
        <div className='flex gap-3 justify-center'>
          <Button onClick={handleDelete} color='failure'>Delete</Button>
          <Button onClick={()=>setShowModal(false)} >Cancel</Button>
        </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
    </>
  )
}


