import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from 'react-router-dom'

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(!data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShoWMore = async () => {
    const startIndex = userPosts.length;
    try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
        const data = await res.json()
        if(res.ok){
            setUserPosts((prev) => [...prev, ...data.posts])
            if(data.posts.length < 9){
                setShowMore(false)
            }
        }
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {userPosts.map((post) => (
                <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{new Date(post.updatedAt).toString()}</TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>
                    {post.category}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                  </TableCell>
                  <TableCell>
                    <Link className="text-teal-500 hover:underline font-medium" to={`/udatepost/${post._id}`}>
                        <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {
            showMore && (
                <button onClick={handleShoWMore} className="w-full text-teal-500 self-center text-sm py-4">Show More</button>
            )
          }
        </>
      ) : (
        <p>You have no post yet!</p>
      )}
    </div>
  );
};

export default DashPosts;
