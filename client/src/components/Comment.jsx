import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";
export default function Comment({ comment, onLike ,onEdit }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async (e) => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };


  const handleSave = async()=>{
     try {
       const res= await fetch(`/api/comment/editComment/${comment._id}`,
      {
        method: 'PUT',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          content:editedContent
        })
      })
      if(res.ok){
        setIsEditing(false);
        onEdit(comment,editedContent);
      }
     } catch (error) {
      console.log(error);
     }
  }
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilepicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1 gap-2 ">
          <span className="">
            {user ? `@${user.username}` : `anonymous user`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              placeholder="Add a comment......"
              maxLength="200"
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
              value={editedContent}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                className=""
                type="button"
                size="sm"
                gradientDuoTone={"purpleToBlue"}
                onClick={handleSave}
                >
                Save
              </Button>
              <Button
                outline
                className=""
                type="button"
                size="sm"
                gradientDuoTone={"purpleToPink"}
                onClick={()=>{
                  setIsEditing(false)
                }}
                >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t gap-2 dark:border-gray-700 max-w-fit ">
              <button
                type="button"
                onClick={() => {
                  onLike(comment._id);
                }}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}>
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-500">
                {comment.likes.length > 0 &&
                  comment.likes.length +
                    " " +
                    (comment.likes === 1 ? "like" : "likes")}

                {/* {comment.numberOfLikes > 0 &&
              comment.likes.length +
                " " +
                (comment.numberOfLikkes === 1 ? "like" : "likes")} */}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500">
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
