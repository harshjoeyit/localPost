
import React, { useEffect, useState } from 'react'
import axiosInstance from '../Utils/axios'
import { useParams } from 'react-router-dom'
import Header from '../Nav/Header';

function PostDetails() {
    const { id } = useParams();

    const [postData, setPostData] = useState({ post: {}, loading:true })
    
    useEffect(() => {
        const getPostData = async() => {
            const res = await axiosInstance.get(`posts/${id}`)
            setPostData({
                post: res.data,
                loading: false
            })
        }
        getPostData()
    })

    return (
        <>  
        <Header />
        <div>
        {
            (postData.loading)
            ? <h3 className='loading'>Loading ...</h3>
            :(
                <div className="post-container" style={{width: '700px', margin: '100px auto'}}>
                    <h3>{ postData.post.title }</h3>
                    <p>{ postData.post.content }</p>
                    <h4>{ postData.post.city }</h4>
                </div>
            )
        }
        </div>
        </>
    )
}

export default PostDetails
