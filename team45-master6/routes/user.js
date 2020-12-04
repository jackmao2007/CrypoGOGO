// User routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../model/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./mongo_helper");

/*** User API routes ****************/
// Set up a POST route to create a user of your web app (*not* a student).
router.post('/api/users', mongoChecker, async (req, res) => {
	// log(req.body)

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	try {
		// Save the user
		const newUser = await user.save()
		res.send(newUser)
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

//////////////

/*** Login and Logout routes ***/
// A route to login and create a session
router.post('/users/login', mongoChecker, async (req, res) => {
	const email = req.body.email
    const password = req.body.password

    try {
    	// Use the static method on the User model to find a user
	    // by their email and password.
		const user = await User.findByEmailPassword(email, password);
		if (!user) {
            res.redirect('/login');
        } else {
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard');
        }
    } catch (error) {
    	if (isMongoError(error)) { 
			res.status(500).redirect('/login');
		} else {
			log(error)
			res.status(400).redirect('/login');
		}
    }

})

router.get('/api/users', mongoChecker, authenticate, asnyc (req, res) => {
		// Get the users
	try {
		const users = await User.find({creator: req.user._id})
		// res.send(students) // just the array
		res.send({ users }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

router.get('/api/users/:id', mongoChecker, authenticate, async (req, res) => {
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
		const user = await User.findOne({_id: id, creator: req.user._id})
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

router.delete('/api/users/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// Delete a student by their id
	try {
		const user = await Student.findOneAndRemove({_id: id, creator: req.user._id})
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}

})

router.put('/api/users/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
	}

	// Replace the student by their id using req.body
	try {
		const user = await User.findOneAndReplace({_id: id, creator: req.user._id}, req.body, {new: true})
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
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

router.patch('/api/users/:id', mongoChecker, authenticate, async (req, res) => {
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
		const user = await Student.findOneAndUpdate({_id: id, creator: req.user._id}, {$set: fieldsToUpdate}, {new: true})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
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

// A route to logout a user
router.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})




// export the router
module.exports = router
