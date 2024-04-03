import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Button, Table} from "flowbite-react"
import {Link} from "react-router-dom"
import { BsDatabaseExclamation } from "react-icons/bs";
import {HiOutlineUserGroup,HiArrowNarrowUp ,HiAnnotation,HiDocument} from "react-icons/hi"
export default function DashboardCom() {
    const {currentUser} = useSelector((state)=>state.user)
    const [user,setUser] = useState([]);
    const [post, setPost] =useState([]);
    const [comment,setComment] = useState([]);
    const [totalUser,setTotalUser]= useState(0);
    const [totalPost,setTotalPost] = useState(0);
    const [totalComment,setTotalComment]=useState(0)
    const[lastMonthUser,setLastMonthUser] = useState(0);
    const[lastMonthPost,setLastMonthPost]=useState(0);
    const[lastMonthComment,setLastMonthComment] = useState(0)
  
    useEffect(()=>{
     const fetchUser= async()=>{
      const res= await fetch(`/api/get-user/${currentUser._id}/?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setUser(data.users)
        setLastMonthUser(data.countLastMonthUser)
        setTotalUser(data.totalUser)
      }
     }
     const fetchPost = async()=>{
      const res= await  fetch(`/api/post/getpost/${currentUser._id}?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setPost(data.post)
        setTotalPost(data.totalPosts);
        setLastMonthPost(data.lastMonthPost.length) 
      }
     }
     const fetchComment = async()=>{
       const res = await fetch("/api/comment/get-all-post-comment?limit=5");
       const data = await res.json();
       if (res.ok) {
        setComment(data.comment)
        setTotalComment(data.totalComment)
        setLastMonthComment(data.lastMonthComment)
        
       }
     }
     if (currentUser.isAdmin) {
      fetchUser();
      fetchPost();
      fetchComment()
     }
    },[currentUser])
  return (
    <div className='p-3 md:mx-auto'>
        <div className="flex flex-wrap gap-4">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{ totalUser}</p>
            </div>
              <HiOutlineUserGroup className='bg-teal-500 text-5xl rounded-full p-3 text-white shadow-lg'/>
          </div>
            <div className="flex gap-2 text-sm">
              <span className='flex items-center text-green-500'>
              {lastMonthUser >0 && <HiArrowNarrowUp/>}
              <p className={`${lastMonthUser <=0 && "text-red-500"}`}>{lastMonthUser}</p>
              </span>
              <span className='text-gray-500'>
                Last Month
              </span>
            </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className='text-gray-500 text-md uppercase'>Total Comment</h3>
              <p className='text-2xl'>{totalComment}</p>
            </div>
              <HiAnnotation className='bg-purple-500 text-5xl rounded-full p-3 text-white shadow-lg'/>
          </div>
            <div className="flex gap-2 text-sm">
              <span className='flex items-center text-green-500'>

              {lastMonthComment >0 && <HiArrowNarrowUp/>}
              <p className={`${lastMonthComment <=0 && "text-red-500"}`}>{lastMonthComment}</p>
              </span>
              <span className='text-gray-500'>
                Last Month
              </span>
            </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className='text-gray-500 text-md uppercase'>Total Post</h3>
              <p className='text-2xl'>{totalPost}</p>
            </div>
              <HiDocument className='bg-lime-500 text-5xl rounded-full p-3 text-white shadow-lg'/>
          </div>
            <div className="flex gap-2 text-sm">
              <span className='flex items-center text-green-500'>

              {lastMonthPost >0 && <HiArrowNarrowUp/>}
              <p className={`${lastMonthPost <=0 && "text-red-500"}`}>{lastMonthPost}</p>
              </span>
              <span className='text-gray-500'>
                Last Month
              </span>
            </div>
        </div>
        </div>

        {/* This is starting the table section from here  */}
        <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">

          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className='p-3'>Recent Users</h1>
             {user.length >0 && <Link to={"/Dashbord?tab=users"}> <Button outline gradientDuoTone={"purpleToPink"}>See All</Button></Link>}
            </div>
            <Table hoverable>
              <Table.Head>

              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y' >
              {
                user && user.map((data)=>
                  <Table.Row key={data._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img className='w-10 h-10 rounded-full bg-gray-500' src={data.avatar} alt="" />
                    </Table.Cell>
                    <Table.Cell>
                      {data.username}
                    </Table.Cell>
                  </Table.Row>
                )
              }
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className='p-3'>Recent Comments</h1>
             {comment.length >0 && <Link to={"/Dashbord?tab=comments"}> <Button outline gradientDuoTone={"purpleToPink"}>See All</Button></Link>}

            </div>
            {comment.length > 0?(<Table hoverable>
              <Table.Head>

              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y' >
              {
                comment && comment.map((data)=>
                  <Table.Row key={data._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='w-96'>
                      <p className='line-clamp-2 '>{data.content}</p>
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      {data.numberOfLikes}
                    </Table.Cell>
                  </Table.Row>
                )
              }
              </Table.Body>
            </Table>):(<>
            <BsDatabaseExclamation className='text-4xl self-center'/>
            <h1 className='text-2xl p-2 text-center text-gray-500'>There is no Comments</h1>
            </>)}
          </div>

          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className='p-3 font-semibold'>Recent Posts</h1>
              {post.length >0 &&<Link to={"/Dashbord?tab=posts"}> <Button outline gradientDuoTone={"purpleToPink"}>See All</Button></Link>}

            </div>
            { 
            post.length>0?(
            <Table hoverable>
              <Table.Head>

              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Tittle</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y' >
              {
                post && post.map((data)=>
                  <Table.Row key={data._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img className='w-14 h-10 rounded-md bg-gray-500' src={data.postImg} alt="" />
                    </Table.Cell>
                    <Table.Cell className='w-96'>
                     <p className='line-clamp-2'> {data.tittle} </p> 
                    </Table.Cell>
                    <Table.Cell className='w-5'>{data.category}</Table.Cell>
                  </Table.Row>
                )
              }
              </Table.Body>
            </Table>):(<>
            <BsDatabaseExclamation className='text-4xl self-center'/>
            <h1 className='text-2xl p-2 text-center text-gray-500'>There is no Post</h1>
            </>)
}
          </div>
        </div>
    </div>
  )
}
