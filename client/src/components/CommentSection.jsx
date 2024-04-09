import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal } from "flowbite-react";
function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setcommentError] = useState(null);

  const [showModel, setShowModel] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setcommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setcommentError(error.message);
      return;
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModel(false);
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        
        const data = await res.json();
        
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilepicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className=" text-sm text-tel-500 my-5">
          You must be signed in to comment.
          <Link
            className="text-blue-500"
            to={"/signin"}>
            Sign in
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3">
          <Textarea
            placeholder="Add a comment......"
            row="3"
            maxLength="200"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit" // Add this line
              outline
              gradientDuoTone={"purpleToPink"}>
              {" "}
              Submit{" "}
            </Button>
          </div>
          {commentError && <Alert color={"failure"}>{commentError}</Alert>}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className=" text-sm my-5 flex items-center gap-2">
            <p className="">Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModel(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      {showModel && (
        <Modal
          show={showModel}
          onClose={() => setShowModel(false)}
          popup
          size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this comment?.
              </h3>
              <div className="flex justify-between">
                <Button
                  color="failure"
                  onClick={() => handleDelete(commentToDelete)}>
                  Yes, I'm sure
                </Button>
                <Button
                  onClick={() => setShowModel(false)}
                  color="gray">
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default CommentSection;
