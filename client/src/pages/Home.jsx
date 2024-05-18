import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'

const Home = () => {

  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts')
        const data = await res.json()
        setPosts(data.posts)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetPosts()
  }, [])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-5xl'>🙏 Welcome to my Blog</h1>
        <p className='text-gray-600 dark:text-gray-400 text-xs sm:text-[16px]'>Here you'll find a variety of articles and updates on topics such as Web Development, Software Engineering and Programming Languages. People exited to know what's going into the Tech World.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View All Post
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='max-w-5xl mx-auto p-3 flex flex-col gap-8 pt-20 pb-9'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-9'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to='/search' className='text-lg text-teal-500 text-center hover:underline'>
              View All Post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home