// Post routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the Post and Comment mongoose model
const { Post } = require('../models/post')
const { Comment } = require('../models/comment')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// to validate object IDs
const { ObjectID } = require('mongodb')

/*** Post API Routes  ************************************/

// a POST route to create an post
router.post('/api/posts', mongoChecker, authenticate, async (req, res) => {
	// log(req.body)

	// Create a new post using the Post mongoose model
	const post = new Post({
        createDate: new Date(),
        author: req.user._id, // creator id from the authenticate middleware
        title: req.body.title,
        content: req.body.content,
        comment:[],
        top: false,
        like: 0
	})

	// Save post to the database
	// async-await version:
	try {
		const result = await post.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
})

// a POST route to create an comment
router.post('/api/posts/:id/comments', mongoChecker, authenticate, async (req, res) => {

    const id = req.params.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return; 
	}

    // Create a new post using the Post mongoose model
	const comment = new Comment({
        post: req.params.id,
        createDate: new Date(),
        author: req.user._id, // creator id from the authenticate middleware
        content: req.body.content
	})

	// Save post to the database
	// async-await version:
	try {
        const result = await comment.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
})

// a GET route to get all posts
router.get('/api/posts', mongoChecker, async (req, res) => {
	// Get the posts
	try {
		const posts = await Post.find()
		res.send(posts);
	} catch(error) {
		log(error);
		res.status(500).send("Internal Server Error");
	}

})

// a GET route to get all posts for the logged in user
router.get('/api/users/posts', mongoChecker, authenticate, async (req, res) => {
	// Get the posts
	try {
		const posts = await Post.find({author: req.user._id})
		res.send(posts);
	} catch(error) {
		log(error);
		res.status(500).send("Internal Server Error");
	}

})

// a GET route to get an post by its id
router.get('/api/posts/:id', mongoChecker, async (req, res) => {

	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return; 
	}

	// If id valid, findById
	try {
		const post = await Post.findOne({_id: id})
		if (!post) {
			res.status(404).send('Resource not found')  // could not find this post
		} else { 
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

// a GET route to get all posts for the logged in user
router.get('/api/posts/:id/comments', mongoChecker, authenticate, async (req, res) => {
    
    const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return; 
    }
    
	try {
		const comments = await Comment.find({post: id})
		res.send(comments);
	} catch(error) {
		log(error);
		res.status(500).send("Internal Server Error");
	}

})

// a GET route to get a comment by its id
router.get('/api/comments/:cid', mongoChecker, async (req, res) => {

	const cid = req.params.cid

	if (!ObjectID.isValid(cid)) {
		res.status(404).send();
		return; 
	}

	// If id valid, findById
	try {
		const post = await Comment.findOne({_id: cid})
		if (!post) {
			res.status(404).send('Resource not found')  // could not find this post
		} else { 
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// a DELETE route to remove an account by their id.
router.delete('/api/posts/:id', mongoChecker, authenticate, async (req, res) => {
    const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// Delete a post by their id
	try {
		const post = await Post.findOneAndRemove({_id: id, author: req.user._id})
		if (!post) {
			res.status(404).send()
		} else {   
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}

})

/// a DELETE route to remove an account by their id.
router.delete('/api/comments/:cid', mongoChecker, authenticate, async (req, res) => {
    const cid = req.params.cid

	// Validate id
	if (!ObjectID.isValid(cid)) {
		res.status(404).send('Resource not found')
		return;
	}

	// Delete a post by their id
	try {
        const comment = await Comment.findOneAndRemove({_id: cid, author: req.user._id})
		if (!comment) {
			res.status(404).send()
		} else {   
			res.send(comment)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}

})

// export the router
module.exports = router