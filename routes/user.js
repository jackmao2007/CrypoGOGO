// User routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

/*** User API routes ****************/
// Set up a POST route to create a user of your web app (*not* a student).
router.post('/api/users', mongoChecker, async (req, res) => {

	const user = new User({
		email: req.body.email,
		password: req.body.password,
		username: req.body.username,
		recentActivities: [],
		UserAccounts: [],
		userPosts: [],
		isAdmin: false
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
router.post('/api/users/login', mongoChecker, async (req, res) => {
	const email = req.body.email
    const password = req.body.password

    try {
    	// Use the static method on the User model to find a user
	    // by their email and password.
		const user = await User.findByEmailPassword(email, password);
		if (!user) {
            res.redirect('/sign-in');
        } else {
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/');
        }
    } catch (error) {
    	if (isMongoError(error)) { 
			res.status(500).redirect('/sign-in');
		} else {
			log(error)
			res.status(400).redirect('/sign-in');
		}
    }

})

router.get('/api/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/sign-in')
		}
	})
})


// export the router
module.exports = router
