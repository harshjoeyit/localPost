const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Post title cannot be blank!',
        maxlength: 255
    },
    content: {
        type: String, 
        required: 'Post content cannot be blank!'
    },
    latitude: {
        type: Number,
        max: 90,
        min: -90,
        required: 'Post latitude cannot be blank'
    },
    longitude: {
        type: Number,
        max: 180,
        min: -180,
        required: 'Post longitude cannot be blank'
    },
    city: {
        type: String, 
        maxlength: 100,
        required: 'Post city cannot be blank'
    }

    // image 
});

module.exports = mongoose.model('Post', postSchema);