import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Nav/Header';
import './forms.css'

function Login() {

    const history = useHistory();

    const intiFormData = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(intiFormData)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(formData.email === "" || formData.password==="") {
            setError('Fill the form completely')
            return;
        }
        
        // since we are using a proxy server set in client dependencies
        // we dont need to write
        // http://localhost:5000/...
        // axios will automatically know where to go
        axios
            .post(`api/user/login`, formData)
            .then(res => {
                setError('')
                localStorage.setItem('auth_token', res.data.token)
                setTimeout(() => {
                    history.push('/posts');
                }, 500);
            })
            .catch(err => {
                const data = err.response.data;
                const error = data.message ? data.message : data.error
                setError(error)
            })
    }

    return (
        <>
        <Header />
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                {
                    (error.length > 0) 
                    ? <div className="error">{ error }</div> 
                    : ''
                }
                <div className="input-container"> 
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container"> 
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder='Password'
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-btn-container">
                    <button type="submit">Login</button>
                    <Link to="/register">
                        <button type="button" className="extralink" >Register</button>
                    </Link>
                </div>
            </form>
        
        </div>
        </>
    )
}

export default Login
