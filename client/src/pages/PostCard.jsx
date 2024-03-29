import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns";


export default function PostCard({post}) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
        <Link to={`/post/${post.slug}`}>
        <img className='h-[240px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20' src={post.postImg} alt="" />
        </Link>
        <div className="flex flex-col p-2 gap-2">
            <p className='text-lg font-semibold line-clamp-2 '>{post.tittle}</p>
            <span className='mx-auto  px-2 py-1 max-w-fit my-2 border border-gray-300 rounded-full'>{post.category}</span>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-center py-2 rounded-b-md opacity-100 group-hover:opacity-0 transition-opacity">
        <div className="flex justify-between px-3 text-gray-300 text-sm italic">
            <span>{formatDistanceToNow(new Date(post.updatedAt))} ago</span>
            <span>{(post.content.length/1000).toFixed(0)} min read</span>
        </div>
    </div>
            <Link to={`/post/${post.slug}`} className=' absolute bottom-[-200px] group-hover:bottom-0 z-10  m-2 left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300  text-center py-2 rounded-md'>
           Read Article
            </Link>
        </div>
    </div>
  )
}
