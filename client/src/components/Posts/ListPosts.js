import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../Utils/axios'
import { getLocation } from '../Utils/getLocation'
import Header from '../Nav/Header'
import './posts.css'


const ListPosts = () => {

    const [state, setState] = useState({ posts: [], loading: true })

    useEffect(() => {

        const fetchPosts = async () => {
            const location = await getLocation()
            const { latitude, longitude } = location;

            const res = await axiosInstance.get(`/posts?latitude=${latitude}&longitude=${longitude}`)
            setState(prevState => ({
                ...prevState,
                posts: res.data,
                loading: false
            }))
        }

        fetchPosts()
    }, [])

    return (
        <>
        <Header />
        <div className="postlist-container">
            <h1>Recent Posts</h1>
            {
                (state.loading) 
                ? <h3 className='loading'>Loading ...</h3>
                : (
                    state.posts.map(post => (
                        <ListPostItem
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            content={post.content}
                            city={post.city}
                        />
                    ))
                )
            }
        </div>
        </>
    )
}

// single item stateless component
function ListPostItem({ id, title, content, city }) {
    // add link to other post detail 
    return (
        <Link to={`../posts/${id}`}>
            <div className="post-container">
                <h3>{title}</h3>
                <p>{content}</p>
                <h4>{city}</h4>
            </div>
        </Link>
    )
}

export default ListPosts
