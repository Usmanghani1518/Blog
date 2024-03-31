import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../Component/CallToAction';
import CommentSection from '../Component/CommentSection';
import PostCard from './PostCard';

export default function Post() {
    const {postSlug} = useParams();
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(true);
    const[recentPost,setRecentPost]=useState([])
    useEffect(()=>{
    (async()=>{
        const res  = await fetch(`/api/post/getpost?slug=${postSlug}`,{
            method:"GET"
        });
        const data = await res.json();
        if (res.ok) {
            setData(data.post[0])
            setLoading(false)
        }
    })()
    },[postSlug])

    useEffect(()=>{
        (async()=>{
            const res = await fetch("/api/post/getpost?limit=3")
            const data = await res.json()
            if (res.ok) {
                setRecentPost(data.post)
            }
        })()
    },[])
    console.log(data);
    if (loading) {
        return  <div className='flex justify-center min-h-screen items-center'><Spinner size={"xl"}/></div>
    }
  return (
   <main className=' min-h-screen p-3 flex flex-col mx-w-6xl mx-auto'>
    <h1 className=' text-3xl lg:text-4xl text-center mt-10 p-3 max-w-2xl w-full mx-auto font-serif  '>{data && data.tittle}</h1>
    <Link className='self-center mt-5' to={`/search?category=${data?.category.toLowerCase()}`}>
        <Button color='gray' size={"xs"} pill >{data?.category}</Button>

    </Link>
    <img src={data?.postImg} className='w-full max-h-[600px] object-cover mt-10 p-3' alt="" />
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto max-w-2xl text-xs w-full">
        <span className="italic">{new Date(data?.updatedAt).toLocaleDateString()}</span>
        <span className='italic'>{(data?.content.length/1000).toFixed(0)} min read</span>
    </div>
    <div className=' max-w-2xl w-full p-3 mx-auto  post-content' dangerouslySetInnerHTML={{__html:data?.content}}></div>
    <div className="max-w-4xl w-full mx-auto"><CallToAction category={data?.category}/></div>
    <div className=""><CommentSection  postId={data._id}/></div>
    <div className="flex flex-col justify-center">
        <h1 className='text-center text-2xl font-semibold'>Recent Articles</h1>
        <div className="flex flex-wrap gap-5 justify-center mt-5">

        {
            recentPost && (recentPost.map((post)=><PostCard key={post._id} post={post}/>))
        }
        </div>
    </div>
   </main>
  )
}
