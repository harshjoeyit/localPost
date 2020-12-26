import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Header from '../Nav/Header';


const Register = () => {
    const history = useHistory();

    const intiFormData = {
        name: '',
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
        console.log(formData)

        axios
            .post(`http://localhost:9000/api/user/register`, formData)
            .then(res => {
                console.log(res.data)
                setError('')
                // redirect to signin
                setTimeout(() => {
                    history.push('/login');
                }, 500);
            })
            .catch(err => {
                const data = err.response.data;
                const error = data.message ? data.message : data.error
                console.log(error)
                setError(error)
            })
    }

    return (
        <>
        <Header />
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {
                    (error.length > 0) 
                    ? <div className="error">{ error }</div> 
                    : ''
                }
                <div className="input-container"> 
                    <input 
                        type="text"
                        required
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container"> 
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container"> 
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder='Password'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-btn-container">
                    <button type="submit">Register</button>

                    <Link to="/login">
                        <button type="button" className="extralink" >Log In</button>
                    </Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register