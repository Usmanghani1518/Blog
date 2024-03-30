import React, { useEffect, useState } from 'react'
import {Button, Modal, Table} from "flowbite-react"
import {PiWarningBold} from "react-icons/pi"
export default function DashComment() {
const [comment,setComment] = useState([]);
const [showModal,setShowModal] = useState(false)
const [commentId,setCommentId] = useState(null)
  useEffect(()=>{
      (async()=>{
        const res = await fetch("/api/comment/get-all-post-comment")
        const data = await res.json()
        if (res.ok) {
          setComment(data.comment)
        }
      })()
  },[])
 const handleDelete = async()=>{
   const res = await fetch(`/api/comment/delete-comment/${commentId}`,{
    method:"DELETE"
   })
   const data = await res.json()
   if(res.ok){
     setShowModal(false)
     setComment(comment.filter((comment)=>comment._id !== commentId))
     setCommentId(null)

   }
 }
  return (
    comment?
   ( <div className=' table-auto md:mx-auto p-3 scrollbar overflow-x-scroll scrollbar-track-slate-100 scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500'>
        <Table hoverable className='overflow-x-scroll'>
          <Table.Head>
            <Table.HeadCell>
              Date Updated
            </Table.HeadCell>
            <Table.HeadCell>
              Comment Content
            </Table.HeadCell>
            <Table.HeadCell>
             Number of Likes
            </Table.HeadCell>
            <Table.HeadCell>
              Post ID
            </Table.HeadCell>
            <Table.HeadCell>
              User ID
            </Table.HeadCell>
            <Table.HeadCell>
              Delete
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='mt-2'>
            {
              comment.map((comment)=>
              <Table.Row key={comment._id}>
                <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{comment.content}</Table.Cell>
                <Table.Cell className='text-center'>{comment.numberOfLikes}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.owner}</Table.Cell>
                <Table.Cell><span onClick={()=>{setShowModal(true);setCommentId(comment._id)}} className='text-red-500 cursor-pointer'>Delete</span> </Table.Cell>
              </Table.Row>
              )
            }
          </Table.Body>
        </Table>
        <Modal show={showModal} popup onClose={()=>setShowModal(false)} size={"md"}>
            <Modal.Header/>
            <Modal.Body>
              <PiWarningBold className='text-yellow-200 text-5xl w-full self-center '/>
             <p className='text-gray-400 text-xl font-semibold text-center'>Are you sure to delete this comment?</p> 
             <div className="flex justify-center gap-2 mt-2">
              <Button onClick={()=>setShowModal(false)}>Cancle</Button>
              <Button onClick={handleDelete} color='failure'>Delete</Button>
             </div>
            </Modal.Body>
        </Modal>
    </div>):(
      <div className='flex justify-center items-center min-h-screen text-6xl mx-auto text-gray-500'>
        There is no commment Yet 
      </div>
    )
  )
}
