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


// a GET route to get market data for the supported currencies
router.get('/api/trading/marketData', mongoChecker, authenticate, async (req, res) => {
    let prepData = JSON.parse(JSON.stringify(supportedCurrencies)) // deep copy
    for (let i = 0; i < prepData.length; i++){
        prepData[i].symbol = prepData[i].symbol.toUpperCase()
    }
    res.send(prepData)
})



// export the router
module.exports = router