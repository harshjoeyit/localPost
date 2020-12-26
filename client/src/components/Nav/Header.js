import React from 'react'
import { Link } from 'react-router-dom'
import checkLoggedIn from '../Auth/checkLoggedIn'
import './header.css'

function Header() {
    return (
        <>
        <div className="topnav-container">
            <Link to="/">
                <div className="logo">
                    PostLocal
                </div>
            </Link>
            <div className="navlink">
            {
                checkLoggedIn() ? (
                    <>
                        <Link to="/posts">
                            <span>Posts</span>
                        </Link>
                        <Link to="/logout">
                            <span>Logout</span>
                        </Link>
                    </>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )
            }
            </div>
        </div>
        <div className="blank"></div>
        </>
    )
}

export default Header
