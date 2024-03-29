import { Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";

export default function CommentSection({ postId }) {
  const user = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [totalComment, settotalComment] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showModal,setShowModal] =useState(false)
  const[deletId,setDeleteId] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/comment/get-comment/${user._id}/${postId}`);
      const data = await res.json();
      if (res.ok) {
        setCommentData(data.comment);
        settotalComment(data.totalComments);
        if (data.totalComments > data.comment.length) {
          setShowMore(true);
        }
      }
    })();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/comment/create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment, postId, userId: user._id }),
    });
    const data = await res.json();
    if (res.ok) {
      setComment("");
      const owner = { avatar: user.avatar, username: user.username };
      data.owner = owner;
      setCommentData([data, ...commentData]);
      settotalComment(totalComment+1)
    }
  };
  const handleShowMore = async () => {
    const startInex = commentData.length;
    const res = await fetch(
      `/api/comment/get-comment/${user._id}/${postId}?startIndex=${startInex}`
    );
    const data = await res.json();
    if (res.ok) {
      setCommentData([...commentData, ...data.comment]);
      if (data.comment.length < 5) {
        setShowMore(false);
      }
    }
  };
  const handleLike = async (commentId) => {
    const res = await fetch(`/api/comment/like-comment/${commentId}`, {
      method: "PUT",
    });
    const data = await res.json();
    if (res.ok) {
      const newData = commentData.map((comment) => {
        if (comment._id === commentId) {
          comment.like = data.like;
          comment.numberOfLikes = data.numberOfLikes;
        }
        return comment;
      });
      setCommentData(newData);
    }
  };
  const handleEditSave = async () => {
    const res = await fetch(`/api/comment/edit-comment/${editing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: editingValue }),
    });
    const data = await res.json();
    if (res.ok) {
      const newComment = commentData.map((comment) => {
        if (comment._id === editing) {
          comment.content = data.content;
         
        }
        return comment;
      });
      setCommentData(newComment);
      setEditing(false);
    }
  };

   const handleDeleteComment = async ()=>{
    setShowModal(false);
    const res= await fetch(`/api/comment/delete-comment/${deletId}`,{
      method:"DELETE"
    })
    if (res.ok) {
      setCommentData(commentData.filter((comment)=>comment._id !== deletId))
      settotalComment(totalComment -1)
    }
   }
  return (
    <div className="max-w-2xl w-full mx-auto">
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p>Signed in as:</p>
          <img
            className="w-7 h-7 rounded-full bg-gray-400"
            src={user.avatar}
            alt=""
          />
          <Link
            className="text-teal-400 hover:underline"
            to="/Dashbord?tab=profile"
          >
            @{user.username}
          </Link>
        </div>
      ) : (
        <div>Your must loged in to Comment the post</div>
      )}
      {user && (
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="border-2 rounded-md p-4 border-teal-400 "
          >
            <Textarea
              className="font-semibold text-md"
              rows={3}
              maxLength={200}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Enter your comment Here ....."
            />
            <div className="flex justify-between my-4">
              <p className="text-gray-400 text-xs">
                {200 - comment.length} Reamining Letters
              </p>
              <Button gradientDuoTone="purpleToBlue" outline type="submit">
                Submit
              </Button>
            </div>
          </form>
          <p className="font-semibold my-3">
            {totalComment > 0 ? (
              <>
                Comments{" "}
                <span className=" border-2 border-gray-400 px-2">
                  {" "}
                  {totalComment}
                </span>{" "}
              </>
            ) : (
              <span className="font-semibold mx-auto">No Comment Yet</span>
            )}
          </p>
          {user &&
            commentData?.map((data) => (
              <div
                className="flex p-4 mb-5 border-b dark:border-gray-600 text-sm"
                key={data._id}
              >
                <div className="flex-shrink mr-3">
                  <img
                    className="h-10 w-10  rounded-full bg-gray-400 "
                    src={data.owner?.avatar}
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <div className=" flex items-center mb-1">
                    <span className="font-bold mr-2">
                      @{data.owner?.username || "Anonymous"}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {formatDistanceToNow(new Date(data.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {editing === data._id ? (
                    <>
                      <Textarea
                        onChange={(e) => setEditingValue(e.target.value)}
                        value={editingValue}
                        maxLength={200}
                      />
                      <div className="flex float-end gap-3 mt-1">
                        <Button
                          type="button"
                          onClick={() => setEditing(false)}
                          gradientDuoTone={"purpleToBlue"}
                          size={"xs"}
                        >
                          Cancle
                        </Button>
                        <Button
                          gradientDuoTone={"purpleToBlue"}
                          outline
                          type="button"
                          size={"xs"}
                          onClick={handleEditSave}
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-3">{data.content}</p>
                      <div className="flex items-center gap-2 pt-2 text-gray-400 border-t max-w-fit dark:border-gray-700 text-xs">
                        <button
                          type="button"
                          onClick={() => handleLike(data._id)}
                          className={`text-gray-400 hover:text-blue-500 ${
                            data.like.includes(user._id) && "!text-blue-500"
                          } `}
                        >
                          <AiFillLike className="text-lg" />
                        </button>
                        <p>
                          {data.like.length > 0 &&
                            data.numberOfLikes +
                              " " +
                              (data.numberOfLikes == 1 ? "like" : "likes")}
                        </p>
                        {(user._id === data.owner._id || user.isAdmin) && (
                          <>
                            <p
                              onClick={() => {
                                setEditing(data._id);
                                setEditingValue(data.content);
                              }}
                              className="cursor-pointer hover:underline hover:text-blue-500"
                            >
                              Edit
                            </p>
                            <p onClick={()=>{setShowModal(true);setDeleteId(data._id)}} className="cursor-pointer hover:underline hover:text-red-500">
                              Delete
                            </p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          {showMore && (
            <p className="my-3 pt-2 text-teal-300 text-center">
              <span onClick={handleShowMore} className="cursor-pointer">
                Read More
              </span>
            </p>
          )}
        </div>
      )}
      <Modal popup show={showModal} size={"md"} onClose={()=>setShowModal(false)}>
        <Modal.Header/>
        <Modal.Body>
           <p className="flex justify-center text-6xl text-gray-500"> <CiWarning className="text-6xl font-bold"/></p> 
       <p className="text-center font-semibold text-1xl text-gray-500">Confirm to Delete this comment</p>
       <div className="flex justify-center gap-2 mt-2">

       <Button onClick={()=>setShowModal(false)} color="gray">Cancel</Button>
       <Button onClick={handleDeleteComment} color="failure">Delete</Button>
       </div>
        </Modal.Body>
      
      </Modal>
    </div>
  );
}
