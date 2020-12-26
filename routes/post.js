const router = require('express').Router();
const verify = require('./verifyToken')
const postHelpers = require('../helpers/postHelpers')

// private route 

router.route('/')
.get(verify, postHelpers.getPosts)
.post(verify, postHelpers.createPost)

router.route('/:postId')
.get(verify, postHelpers.getPost)

module.exports = router;