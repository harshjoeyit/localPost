import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getLocation } from '../Utils/getLocation'
import Header from '../Nav/Header'
import './posts.css'
import getHeaders from '../Utils/getHeaders'

const ListPosts = () => {

    const [state, setState] = useState({ posts: [], city:'...', loading: true })

    useEffect(() => {

        const fetchPosts = async () => {
            const location = await getLocation()
            const { latitude, longitude, city } = location;
            const headers = getHeaders();

            const res = await axios.get(`api/posts?latitude=${latitude}&longitude=${longitude}`,  { headers: headers })
            setState(prevState => ({
                ...prevState,
                posts: res.data,
                city: city,
                loading: false
            }))
        }

        fetchPosts()
    }, [])

    return (
        <>
        <Header />
        <div className="postlist-container">
            <div className="post-header">
                <h1>Recent Posts</h1>
                <p className="city"><i className="fa fa-map-marker" aria-hidden="true"></i> { state.city }</p> 
            </div>
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
        <div className="post-container">
            <h3>{title}</h3>
            <p>{content}</p>
            <h4>{city}</h4>
        </div>
    )
}

export default ListPosts
