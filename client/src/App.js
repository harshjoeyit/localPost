import React from 'react'
import Header from './components/Nav/Header'
import './main.css'
import postImage from './Images/post.png'

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="hero-text">
          <div>
            <h1>It's</h1>
            <h1>What</h1>
            <h1>is happening</h1>
          </div>
        </div>
        <div className="hero-image">
          <img src={postImage} alt="post" />
        </div>
      </div>
    </>
  )
}

export default App