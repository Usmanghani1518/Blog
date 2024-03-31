import { Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import serchImage from "../assets/search.jpg"
import PostCard from "./PostCard.jsx"

export default function Search() {
  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "asc",
    category: "",
  });
  const location = useLocation();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    const urlPrams = new URLSearchParams(location.search);
    const searchPrams = urlPrams.get("searchTerm");
    const limit = urlPrams.get("limit");
    const sort = urlPrams.get("sort");
    const category = urlPrams.get("category");
    if (searchPrams || sort || category) {
      setSideBarData({
        ...sidebarData,
        searchTerm: searchPrams,
        sort: sort,
        category: category,
      });
    }
    (async () => {
      const search = urlPrams.toString();
      const res = await fetch(`/api/post/getpost?${search}`);
      const data = await res.json();
      if (res.ok) {
        setPost(data.post)
        setLoading(false)
        if (data.post.length <=9) {
          setShowMore(true)
        }
      }
    })();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "order") {
      const order = e.target.value || "des";
      setSideBarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      console.log(e.target.value);
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sidebarData, category: category });
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlPrams = new URLSearchParams(location.search);
    urlPrams.set("searchTerm",sidebarData.searchTerm);
    urlPrams.set("catogery",sidebarData.category);
    urlPrams.set("order",sidebarData.sort)
    const search = urlPrams.toString()
    navigate(`/search?${search}`)
  }
  const handleShowMore = async()=>{
    const numberOfPost = post.length
    const startIndex = numberOfPost;
    const urlPrams = new URLSearchParams(location.search);
    urlPrams.set("startIndex",startIndex)
    const searchquery = urlPrams.toString()
    const res = await fetch(`/api/post/getpost?${searchquery}`)
    const data = await res.json()
    if (res.ok) {
      setPost([...post,...data.post])
      if (data.post.length < 9) {
        setShowMore(false)
      }
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search"
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <Select id="order" onChange={handleChange} value={sidebarData.sort||""}>
              <option value="asc">Latest</option>
              <option value="des">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              id="category"
              onChange={handleChange}
              value={sidebarData.category ||""}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="react.js">React</option>
              <option value="next.js">Next</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">Apply Filters</Button>
        </form>
      </div>
      <div className="w-full ">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
       Post Result:
        </h1>
        <div className="flex flex-wrap gap-4 my-5 justify-center" >
          {
            !loading && post.length ===0 && 
              (<div ><img className="w-full object-cover" src={serchImage} alt="" /></div>)
          }
          {
            loading && <div><Spinner/>loading</div>
          }
          {
            !loading && post && post.map((data)=>
            <PostCard key={data._id} post={data}/>
            )
          }
        </div>
     {showMore&&<p onClick={handleShowMore} className="py-4 text-teal-500 hover:underline cursor-pointer text-center">Show More</p>}
      </div>
    </div>
  );
}
