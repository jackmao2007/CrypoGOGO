// Student routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the student mongoose model
const { Student } = require('../model/userapi')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// to validate object IDs
const { ObjectID } = require('mongodb')


/*** User API Routes  ************************************/
// The '/api' indicates that this is a route for a data resource API (in this case, a JSON API).
//  Routes for webpages or static directories (above) will usually not have this prefix.

// a POST route to *create* a student
router.post('/api/userlists', mongoChecker, authenticate, async (req, res) => {
	// log(req.body)

	// Create a new student using the Student mongoose model
	const userapi = new UserApi({
		name: req.body.name,
		creator: req.user._id // creator id from the authenticate middleware
	})

	// Save student to the database
	// async-await version:
	try {
		const result = await userapi.save()	
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

// a GET route to get all students
router.get('/api/userlists', mongoChecker, authenticate, async (req, res) => {

	// Get the students
	try {
		const userapi = await UserApi.find({creator: req.user._id})
		// res.send(students) // just the array
		res.send({ userapi }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

/// a GET route to get a student by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project if you want)
router.get('/api/userlists/:id', mongoChecker, authenticate, async (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	try {
		const userapi = await UserApi.findOne({_id: id, creator: req.user._id})
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			//res.send({student})   
			res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// a DELETE route to remove a student by their id.
router.delete('/api/userlists/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// Delete a student by their id
	try {
		const userapi = await UserApi.findOneAndRemove({_id: id, creator: req.user._id})
		if (!userapi) {
			res.status(404).send()
		} else {   
			res.send(userapi)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}

})

/* Updating resources - two methods: PUT and PATCH */

// a PUT route for replacing an *entire* resource.
//  The body should contain *all* of the required fields of the resource.
//  This might be less desirable because the client will have to do a GET to find the original
//   values of all of the other fields beyond the ones they want to update.
router.put('/api/userlists/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
	}

	// Replace the student by their id using req.body
	try {
		const userapi  = await UserApi.findOneAndReplace({_id: id, creator: req.user._id}, req.body, {new: true})
		if (!userapi) {
			res.status(404).send()
		} else {   
			res.send(userapi)
		}
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}

})

/// a PATCH route for making *specific* changes to a resource.
// The body will be an array that consists of a list of changes to make to the
//  resource:
/*
[
  { "op": "replace", "path": "/year", "value": 4 },
  { "op": "replace", "path": "/name", "value": "Jim" },
  ...
]
*/
// Based on standard specifcation: https://tools.ietf.org/html/rfc6902#section-3
//   - there are other ways to modify resources (adding, removing properties), but here we will
//     just deal with replacements since our schema is fixed.
router.patch('/api/userlists/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

	// Update the student by their id.
	try {
		const userapi= await UserApi.findOneAndUpdate({_id: id, creator: req.user._id}, {$set: fieldsToUpdate}, {new: true})
		if (!userapi) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(userapi)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

// export the router
module.exports = router

