// Acocunt routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the models
const { Account } = require('../models/accounts')
const { Position } = require('../models/positions')
let supportedCurrencies = require('../marketData')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// to validate object IDs
const { ObjectID } = require('mongodb');
const { response } = require('express');


// a GET route to get dashboard summary for the logged in user
router.get('/api/dashboard/summary', mongoChecker, authenticate, async (req, res) => {
	let totalCash = 0;
	let totalMarketValue = 0;
	let totalPL = 0;
	// Get the accounts
	try {
		let userPositions = []
		const accounts = await Account.find({creator: req.user._id})
		for (let i = 0; i < accounts.length; i++){
			totalCash += accounts[i].cash
			const accountPositions = await Position.find({account: accounts[i]._id})
			userPositions = userPositions + accountPositions
		}
		for (i = 0; i < userPositions; i++){
			const data = supportedCurrencies.find((coin) => coin.symbol == userPositions[i].symbol)
			const marketValue = data.currentPrice * userPositions[i].quantity
			totalMarketValue += marketValue
			totalPL += marketValue - userPositions[i].bookValue
		}
		const updatedDate = Date.now()
		let response = {totalCash, totalMarketValue, totalPL, updatedDate}
		res.send(response)
	} catch(error) {
		log(error);
		res.status(500).send("Internal Server Error");
	}

})

// export the router
module.exports = router