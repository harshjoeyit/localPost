const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');

// import routes 
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();
const port = process.env.port || 5000;


// Connect to db
mongoose.set('debug', true)
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


// home 
app.get('/', (req, res) => {
    res.send('Hello from Home')
})


// listenting
app.listen(port, () => console.log('server running'))
