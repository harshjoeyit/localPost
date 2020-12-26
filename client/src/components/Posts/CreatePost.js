
import React, { useEffect, useState } from 'react'
import axiosInstance from '../Utils/axios'
import { getLocation } from '../Utils/getLocation'
import Header from '../Nav/Header'
import { useHistory } from 'react-router-dom'


const CreatePost = () => {
    const history = useHistory()

    const initPostData = {
        title: null,
        content: null,
        latitude: null,
        longitude: null,
        city: null
    }

    const [postData, setPostData] = useState(initPostData)
    const [error, setError] = useState('')

    // set the latitude, longitude, and city using
    useEffect(() => {
        getLocation()
            .then(data => {
                setPostData(prevState => ({
                    ...prevState,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    city: (data.city) ? data.city: 'Kanpur'
                }))
            })
            .catch(err => console.log(err))
    })

    const handleChange = (e) => {
        // console.log(e.target.value)
        setPostData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(postData)

        axiosInstance
            .post(`/posts`, postData)
            .then(res => {
                console.log(res.data._id)
                setError('')
                setTimeout(() => {
                    history.push(`../posts/${res.data._id}`)
                }, 500) 
            })
            .catch(err => {
                setError(err.data)
            })
    }

    const handleCancel = () => {
        const res = window.confirm('Are you sure!')
        if(res) history.goBack();
    }

    return (
        <>
        <Header />
        <div className="form-container">
            
            <form
                style={{width:'700px'}} 
                onSubmit={ handleSubmit } >
                <h1>What's on your mind?</h1>
                {
                    (error.length > 0) 
                    ? <div className="error">{ error }</div> 
                    : ''
                }
                <div className="input-container"> 
                    <input
                        style={{width:'100%'}} 
                        type='text'
                        name='title'
                        required
                        placeholder='Post Title'
                        onChange={ handleChange }
                    />
                </div>
                <div className="input-container"> 
                    <textarea
                        style={{width:'100%', resize:'none'}} 
                        rows='10'
                        name='content'
                        required
                        placeholder='Description'
                        onChange={ handleChange }
                    />
                </div>
                <div className="form-btn-container">
                    <button type="button" onClick={handleCancel} >Cancel</button>
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default CreatePost
