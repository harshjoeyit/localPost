
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getLocation } from '../Utils/getLocation'
import Header from '../Nav/Header'
import { useHistory } from 'react-router-dom'
import getHeaders from '../Utils/getHeaders'


const CreatePost = () => {
    const history = useHistory()

    const initPostData = {
        title: null,
        content: null,
        latitude: null,
        longitude: null,
        city: '...'
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
                    city: (data.city) ? data.city: 'Unavailable'
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

        const headers = getHeaders()

        axios
            .post(`api/posts`, postData, { headers: headers })
            .then(res => {
                setError('')
                setTimeout(() => {
                    history.push(`../posts`)
                }, 500) 
            })
            .catch(err => {
                setError(err.response.data)
            })
    }

    const handleCancel = () => {
        const res = window.confirm('Do you want to cancel the post!')
        if(res) history.goBack();
    }

    return (
        <>
        <Header />
        <div className="form-container">
            
            <form 
                onSubmit={ handleSubmit } >
                <div className="post-header" style={{flexDirection: 'column'}}>
                    <h1>What's on you mind?</h1>
                    <p className="city">
                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                        { postData.city }
                    </p> 
                </div>
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
