import { Table, Modal, Button } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck, FaTimes} from 'react-icons/fa'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [commentIdToDelete, setCommentIdToDelete] = useState();
  console.log(comments);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

const handleDeleteComment = async (e)=>{
  setShowModel(false);
  e.preventDefault();
   try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
      {
        method:"DELETE",
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModel(false);
      } else{
        console.log(data.message);
      }

   } catch (error) {
    console.log(error.message);
   }
}
  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 dark: scrollbar-track-slate-700 dark: scrollbar-thumb-slate-500
    "
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>

              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={comment._id}>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                {comment.content}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.likes.length}
                  </Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId }</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="cursor-pointer font-medium text-red-500"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comment yet.</p>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Comment?.
            </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button onClick={() => setShowModel(false)} color="gray">
                No,cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
