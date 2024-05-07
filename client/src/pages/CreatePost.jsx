import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl font-semibold my-7 text-center'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' required placeholder='Title...' name='title' className='flex-1' />
                <Select>
                    <option value="unCategorized">Select a Category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write something...' className=' h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost