import {Link} from "react-router-dom"
import CallToAction from "../Component/CallToAction.jsx"
import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
import PostCard from "./PostCard.jsx"
function Home() {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const [seeAll ,setseeAll] = useState(false)
  const [post,setPost] = useState([])
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`/api/post/getpost/${currentUser._id}`)
      const data = await res.json();
      if (res.ok) {
        setPost(data.post)
        if (data.post.length === 9 ) {
          setseeAll(true)
        }
      }
    })()

  },[])
 
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl ">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">Here you find variety of article and blogs on topic such as web developement and much more on any programmnig language</p>
       <Link className="text-teal-500 hover:underline text-xs sm:text-sm font-semibold " to={"/search"}>View all posts</Link>
      </div>
      <div className="bg-amber-100 dark:bg-slate-700">
        <CallToAction/>
      </div>
      <div className="flex flex-col gap-8 py-7  w-full mx-auto">
        {
          post && post.length > 0 && 
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-center">Recent Post </h1>
            <div className="flex flex-wrap gap-4 justify-center">
            {
              post.map((data)=>
              <PostCard key={data._id} post={data}/>
              )
            }
            </div>
           {seeAll && <Link to={"/search"} className="text-teal-500 hover:underline text-center">View all posts</Link>}
          </div>
           }

      </div>
    </div>
  )
}

export default Home