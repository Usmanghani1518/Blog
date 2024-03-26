import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatDistanceToNow } from "date-fns";

export default function CommentSection({ postId }) {
  const user = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  console.log(postId);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/comment/get-comment/${user._id}/${postId}`);
      const data = await res.json();
      if (res.ok) {
        setCommentData(data);
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
      console.log(data);
      setComment("");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p>Signed in as:</p>
          <img className="w-7 h-7 rounded-full" src={user.avatar} alt="" />
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
            Commetents{" "}
            <span className="border border-gray-400 px-3 py-1 text-sm">
              {" "}
              {commentData.length > 0 ? commentData.length : "0"}{" "}
            </span>
          </p>
          {user &&
            commentData?.map((data) => (
              <div
                className="flex p-4 border-b dark:border-gray-600 text-sm"
                key={data._id}
              >
                <div className="flex-shrink mr-3">
                  <img
                    className="h-10 w-10  rounded-full"
                    src={data.owner.avatar}
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <div className=" flex items-center mb-1">
                    <span className="font-bold mr-2">
                      @{data.owner.username}{" "}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {formatDistanceToNow(new Date(data.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-500">{data.content}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
