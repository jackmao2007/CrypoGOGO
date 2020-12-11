// Post routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the Post and Comment mongoose model
const { Post } = require('../models/post')

// body parser
const bodyParser = require('body-parser')
router.use(bodyParser.json());


// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// to validate object IDs
const { ObjectID } = require('mongodb')

/*** Post API Routes  ************************************/

// a POST route to create an post
router.post('/api/posts', mongoChecker, async (req, res) => {
	// log(req.body)

	// Create a new post using the Post mongoose model
	const post = new Post({
        author: 111,
        //author: req.user._id, // creator id from the authenticate middleware
        title: req.body.title,
        content: req.body.content,
        comments:[],
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

// a POST route to like a post
router.post('/api/posts/like/:id', mongoChecker, async (req, res) => {
	const postID = req.params.id;
	if (!ObjectID.isValid(postID)) {
		res.status(404).send();
		return; 
	}

	Post.findById(postID).then((post) => {
		if(!post){
			res.status(404).send()
		}else{
			post.like += 1;
		}
		post.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})
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

// a GET route to get all posts for the current user
router.get('/api/users/posts', mongoChecker, async (req, res) => {
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

/// a DELETE route to remove a post by their id.
router.delete('/api/posts/:id', mongoChecker, async (req, res) => {
    const postID = req.params.id

	// Validate id
	if (!ObjectID.isValid(postID)) {
		res.status(404).send('Resource not found')
		return;
	}

	// Delete a post by their id
	try {
		const post = await Post.findOneAndRemove({_id: postID})
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



/*** Comment API Routes  ************************************/

// a POST route to create an comment
router.post('/api/posts/comments/:id', mongoChecker, async (req, res) => {

    const postID = req.params.id

    if (!ObjectID.isValid(postID)) {
		res.status(404).send();
		return; 
	}

    // Create a new post using the Post mongoose model
	const comment = {
		postBelongTo: postID,
		author: 111,
		commentContent: req.body.commentContent
	}

	Post.findById(postID).then((post) => {
		if(!post){
			res.status(404).send()
		}else{
			post.comments.push(comment)
		}
		post.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})
})

// a GET route to get all comments for the current post
router.get('/api/posts/:id/comments', mongoChecker, async (req, res) => {
    
    const postID = req.params.id

    if (!ObjectID.isValid(postID)) {
		res.status(404).send();
		return; 
	}
	Post.findById(postID).then((post) => {
		if(!post){
			res.status(404).send()
		}else{
			res.send(post.comments)
		}}, (error) => {
			res.status(400).send(error)
		})
})

// a GET route to get a comment by its id
router.get('/api/comments/:cid', mongoChecker, async (req, res) => {

	// const cid = req.params.cid

	// if (!ObjectID.isValid(cid)) {
	// 	res.status(404).send();
	// 	return; 
	// }

	// // If id valid, findById
	// try {
	// 	const post = await Comment.findOne({_id: cid})
	// 	if (!post) {
	// 		res.status(404).send('Resource not found')  // could not find this post
	// 	} else { 
	// 		res.send(post)
	// 	}
	// } catch(error) {
	// 	log(error)
	// 	res.status(500).send('Internal Server Error')  // server error
	// }

})



/// a DELETE route to remove a comment by their id.
router.delete('/api/comments/:cid', mongoChecker, authenticate, async (req, res) => {
    const cid = req.params.cid

	// // Validate id
	// if (!ObjectID.isValid(cid)) {
	// 	res.status(404).send('Resource not found')
	// 	return;
	// }

	// // Delete a comment by their id
	// try {
    //     const comment = await Comment.findOneAndRemove({_id: cid, author: req.user._id})
	// 	if (!comment) {
	// 		res.status(404).send()
	// 	} else {   
	// 		res.send(comment)
	// 	}
	// } catch(error) {
	// 	log(error)
	// 	res.status(500).send() // server error, could not delete.
	// }

})

// export the router
module.exports = router