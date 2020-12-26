const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes 
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();
const port = 9000;
dotenv.config();


// Connect to db
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/todo-api', { 
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
