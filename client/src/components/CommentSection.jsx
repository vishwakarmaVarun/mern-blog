import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [commentArray, setcommentArray] = useState([]);
  const [showModel, setShowModel] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getcommentArray = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setcommentArray(data);
        }
      } catch (error) {
        setCommentError(error.message);
      }
    };
    getcommentArray();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/createComment", {
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
        setCommentError(null);
        setcommentArray([data, ...commentArray]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("signin");
        return;
      }
      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        setcommentArray(
          commentArray.map((comment) => 
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
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, content) => {
    setcommentArray(
      commentArray.map((c) => 
        c._id === comment._id ? {...c, content: content} : c
      )
    )
  }

  const handleDelete = async (commentId) => {
    setShowModel(false)
    try {
      if(!currentUser){
        navigate('/signin')
        return;
      }
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: 'DELETE',
      })

      if(res.ok){
        setcommentArray(commentArray.filter((comment) => comment._id !== commentId))
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 dark:text-gray-400 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="currentuser profile picture"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs dark:text-cyan-400 text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-2">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            className=" resize-none"
            placeholder="Add a comment..."
            rows="4"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-400 text-[13px]">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {commentArray.length === 0 ? (
        <p className="text-sm my-5">No commentArray yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p>Comments</p>
            <div className="border border-gray-400 py-0.5 px-2 rounded-sm">
              <p>{commentArray.length}</p>
            </div>
          </div>
          {commentArray.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModel(true)
                  setCommentToDelete(commentId)
                }}
              />
            );
          })}
        </>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="text-gray-600 mb-5 text-lg dark:text-gray-400">
              Are you sure want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
                Yes, I'm Sure
              </Button>
              <Button color="dark" onClick={() => setShowModel(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CommentSection;
