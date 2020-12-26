
const { Post } = require('../models');
const { postCreateValidation } = require('../validations/postValidations')
const { coordsValidation } = require('../validations/coordsValidation')


// List all posts 
const getPosts = async (req, res) => {
    // validation
    const { error } = coordsValidation(req.query)
    if (error) return res.status(400).send(error.details[0])

    try {
        let posts = await Post.find();
        posts = sortByClosestToCurrentLocation(posts, req.query)
        return res.json(posts)
    }
    catch (err) {
        return res.send(err)
    }
}


// sort posts 
const sortByClosestToCurrentLocation = (posts, { latitude: currLat, longitude: currLon }) => {

    // comparator function for the sort 
    const compare = (post1, post2) => {
        let { latitude: lat1, longitude: lon1 } = post1
        let { latitude: lat2, longitude: lon2 } = post2
        let dis1 = calculateDistance(lat1, lon1, currLat, currLon)
        let dis2 = calculateDistance(lat2, lon2, currLat, currLon)

        if (dis1 < dis2) return -1
        else if (dis1 > dis2) return 1
        else return 0
    }

    // calculate the distance between 2 points 
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515 * 1.609344
        return dist
    }

    // sort and return the array of posts 
    posts.sort(compare)
    return posts
}


// Create a new post
const createPost = async (req, res) => {
    // Lets validate the post data 
    const { error } = postCreateValidation(req.body)
    if (error) return res.status(400).send(error.details[0])

    const { title, content, latitude, longitude, city } = req.body;

    // create new post 
    const newPost = new Post({
        title, content, latitude, longitude, city
    })

    try {
        const savedPost = await newPost.save()
        return res.status(201).send(savedPost)
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

// Get a single post 
const getPost = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postId);
        return res.json(foundPost)
    }
    catch (err) {
        return res.send(err)
    }
}


module.exports.getPosts = getPosts
module.exports.createPost = createPost
module.exports.getPost = getPost