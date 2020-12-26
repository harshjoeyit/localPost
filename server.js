const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const path = require('path');

// import routes 
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();


// Connect to db
mongoose.set('debug', false)
mongoose.connect(keys.DB_CONNECT, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
}, () => { 
    console.log('connected to db') 
})


// Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// CORS
app.use(cors()) 


// Route Middlewares 
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


// Serve static assets if in production 
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// port 
const port = process.env.PORT || 5000;

// listenting
app.listen(port, () => console.log('server running'))
