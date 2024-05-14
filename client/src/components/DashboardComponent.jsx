import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DashboardComponent = () => {

    const {currentUser} = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthPosts, setLastMonthPosts] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()
                if(res.ok){
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }

            } catch (error) {
                console.log(error.message)
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5')
                const data = await res.json()
                if(res.ok){
                    setPosts(data.posts)
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthPosts)
                }

            } catch (error) {
                console.log(error.message)
            }
        }
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5')
                const data = await res.json()
                if(res.ok){
                    setComments(data.comment)
                    setTotalComments(data.totalComments)
                    setLastMonthComments(data.lastMonthComments)
                }

            } catch (error) {
                console.log(error.message)
            }
        }

        if(currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }

    }, [currentUser])

    return (
        <div>DashboardComponent</div>
    )
}

export default DashboardComponent