const log = console.log
const express = require('express');
const router = express.Router();
const { Order } = require('../models/orders')
// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");
// to validate object IDs
const { ObjectID } = require('mongodb')

// a POST route to *create* 
router.post('/api/orders', mongoChecker, authenticate, async (req, res) => {

	const order = new Order({
        creator: req.user._id,
        account: req.body.account,
        mode: req.body.mode,
        quantity: req.body.quantity,
        orderType: req.body.orderType,
        limit: req.body.limit,
        stop: req.body.stop,
        duration: req.body.duration,
        status: req.body.status,
        parentOrder: req.body.parentOrder 
	})

	try {
		const result = await order.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

router.get('/api/orders', mongoChecker, authenticate, async (req, res) => {
	try {
		const orders = await Order.find({creator: req.user._id})
		res.send(orders);
	} catch(error) {
		log(error);
		res.status(500).send("Internal Server Error");
	}

})

/// a GET route to get an order by their id.
router.get('/api/orders/:id', mongoChecker, authenticate, async (req, res) => {

	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return; 
	}

	// If id valid, findById
	try {
		const order = await Order.findOne({_id: id, creator: req.user._id})
		if (!order) {
			res.status(404).send('Resource not found')  // could not find this order
		} else { 
			res.send(order)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})

/// a DELETE route to remove an order by their id.
router.delete('/api/orders/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	try {
		const order = await Order.findOneAndRemove({_id: id, creator: req.user._id})
		if (!order) {
			res.status(404).send()
		} else {   
			res.send(order)
		}
	} catch(error) {
		log(error)
		res.status(500).send()
	}

})


// export the router
module.exports = router