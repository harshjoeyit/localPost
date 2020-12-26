import React from 'react'

const style = {
    textAlign: 'center', 
    margin: '20px auto'
}

function NotFound() {
    return (
        <div>
            <h1 style={style}>404</h1>
            <h1 style={style} >Page not found</h1>
        </div>
    )
}

export default NotFound
