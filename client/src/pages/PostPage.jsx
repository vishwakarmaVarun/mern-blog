import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner color='warning' size='lg' />
      </div>
    );

  return (
    <main className='p-1 sm:p-3 flex flex-col max-w-5xl mx-auto min-h-screen overflow-x-hidden'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl underline'>
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs' className='border-b-2 border-gray-400'>
          {(post && post.category).toUpperCase()}
        </Button>
      </Link>
      <img className='mt-10 p-3 max-h-[600px] w-full object-cover' src={post && post.image} alt='post image' />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-sm'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-4xl mx-auto w-full post-content'>
        <div dangerouslySetInnerHTML={{ __html: post && post.content }} />
      </div>
      <div className='max-w-6xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
    </main>
  );
};

export default PostPage;
