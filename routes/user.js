// User routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// to validate object IDs
const { ObjectID } = require('mongodb')


// body parser
const bodyParser = require('body-parser')
router.use(bodyParser.json());

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

// a GET route to get all images
router.get("/api/users", mongoChecker, async (req, res) => {
    User.find().then(
        users => {
            res.send({ users }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

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


router.patch('/api/users/:username', mongoChecker, async (req, res) => {
	const name = req.params.username
	const newpassword = req.body.password

	try {
		const user = await User.findOneAndUpdate({username: name}, {password: newpassword}, {new: true})
		if (!user) {
			res.status(404).send('User not found')
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

router.get('/api/users/:username', mongoChecker, async (req, res) => {
	const name = req.params.username

	try {
		const user = await User.findOne({username: name})
		if (!user) {
			res.status(404).send('User not found')
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

router.delete('/api/users/:username', mongoChecker, async (req, res) => {
	const name = req.params.username

	try {
		const user = await User.findOneandRemove({username: name})
		if (!user) {
			res.status(404).send('User not found')
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

// A route to check if a user is logged in on the session
router.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.username, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).send();
    }
});

// export the router
module.exports = router



