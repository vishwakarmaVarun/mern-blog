import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'

const UpdatePost = () => {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
    const {currentUser} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const {postId} = useParams()

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()

                if(!res.ok){
                    console.log(data.message)
                    setPublishError(data.message)
                    return;
                }
                if(res.ok){
                    setPublishError(null)
                    setFormData(data.posts[0])
                }
            }

            fetchPosts()
        } catch (error) {
            console.log(error.message)
        }
    }, [postId])

    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError("Please select an image")
                return
            }
            setImageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapShot) => {
                    const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError("Image upload Failed")
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({...formData, image: downloadUrl})
                    })
                }
            )

        } catch {
            setImageUploadError("Image Upload Failed due to some issue")
            setImageUploadProgress(null)
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/post/updateposts/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if(!res.ok){
                setPublishError(data.message)
                return
            }
            if(res.ok){
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }

        } catch (error) {
            setPublishError("Something went wrong");
            console.log(error, error.message);
        }
    }

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-3xl font-semibold my-7 text-center">Update a Post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        required
                        placeholder="Title..."
                        name="title"
                        className="flex-1"
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        value={formData.title || ''}
                    />
                    <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option value="unCategorized">Select a Category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {
                            imageUploadProgress ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div>
                            ) : ('Upload Image')
                        }
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt="uploaded image" className="w-full h-72 object-cover" />
                )}
                <ReactQuill
                    theme="snow"
                    placeholder="Write something..."
                    className=" h-72 mb-12"
                    required
                    onChange={(value) => setFormData({...formData, content: value})}
                    value={formData.content}
                />
                <Button type="submit" gradientDuoTone="purpleToPink">
                    Update Post
                </Button>
            </form>
            {publishError && <Alert color='failure'>{publishError}</Alert>}
        </div>
    );
};

export default UpdatePost;