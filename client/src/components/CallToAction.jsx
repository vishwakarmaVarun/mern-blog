import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>Want to learn more about Javascript?</h2>
            <p className='text-gray-400 my-2'>Checkout these resources with 100 Javascript Projects</p>
            <Button gradientDuoTone='pinkToOrange' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    100 Javascript Projects
                </a>
            </Button>
        </div>
        <div className='flex-1 p-7'>
            <img src="https://wpengine.com/wp-content/uploads/2021/07/jsheader.png" />
        </div>
    </div>
  )
}

export default CallToAction