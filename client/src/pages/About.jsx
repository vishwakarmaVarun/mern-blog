import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className=' mt-32'>
          <h1 className='text-4xl font-semibold text-center my-7'>About Varun's Blog</h1>
          <div className='text-md dark:text-gray-400 text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Varun's Blog! This blog was created by Varun Vishwakarma as a personal project to share his thoughts and ideas with the world. Varun is a Full Stack Web Developer who love to write about technology, coding, and everything in between.
            </p>
            <p>
              On this blog, you'll find weekly articles and posts on topics sucha as Web Development, Software Engineering, and Programming Languages. Varun is always learning and exploring new technologies, so be sure to check back often for new content.
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of Learners can help each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About