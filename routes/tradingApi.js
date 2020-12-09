

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
const { exception } = require('console');


// a GET route to get market data for the supported currencies
router.get('/api/trading/marketData', mongoChecker, authenticate, async (req, res) => {
    let prepData = JSON.parse(JSON.stringify(supportedCurrencies)) // deep copy
    for (let i = 0; i < prepData.length; i++){
        prepData[i].symbol = prepData[i].symbol.toUpperCase()
    }
    res.send(prepData)
})

router.post('/api/trading/createOrder', mongoChecker, authenticate, async (req, res) => {
    parrentOrderId = null;
    // get Account 
    try {
		const account = await Account.findOne({creator: req.user._id, _id: req.body.account})

        let limit = 0
        let stop = 0
        let price = supportedCurrencies.find((coin) => coin.symbol = req.body.symbol).currentPrice
        if (req.body.orderType == "Limit"){
            limit = req.body.orderLimit
            price = limit
        }else if (req.body.orderType == "Stop"){
            stop = req.body.orderStop
            price = stop
        }

        if (req.body.mode == 'buy'){
            // price check (cant buy if you dont have money)
            if (price * req.body.quanity > account.cash){
                res.status(480).send("Insufficient funds")
                return
            }
            account.cash = Math.round((account.cash - price * req.body.quanity)*100)/100
            await account.save()
        } else if (req.body.mode == 'sell'){
            // position check (Cant sell stuff you dont have)
            const position = await Position.findOne({creator: req.user._id, account: req.body.account, symbol: req.body.symbol})
            if (!position || position.quantity < req.body.orderQuantity) {
                res.status(481).send("Not enough positions to sell")
                return
            }
        }
        // new Order
        const order = new Order({
            creator: req.user._id,
            account: req.body.account,
            symbol: req.body.symbol,
            mode: req.body.mode,
            quantity: req.body.orderQuantity,
            orderType: req.body.orderType, 
            limit: limit,
            stop: stop,
            duration: req.body.orderDuration,
            status: "Accepted",
            timePlaced: Date.now()
        })
        saved = await order.save()
        parrentOrderId = saved._id
        // Handle Braket order
        if (req.body.orderBracket == "true"){
            let bracketMode = 'sell'
            let bracketStatus = 'Pending'
            if (req.body.mode == 'buy'){ // Error checks, check if bracket is legitimate
                if (req.orderProfitLmt <= orderLossStp){
                    bracketStatus = 'Failed'
                }
            }else if (req.body.mode == 'buy'){ // Error checks, check if bracket is legitimate
                bracketMode = 'buy'
                if (req.orderProfitLmt >= orderLossStp){
                    bracketStatus = 'Failed'
                }
            }
            //Profit order
            const porder = new Order({
                creator: req.user._id,
                account: req.body.account,
                symbol: req.body.symbol,
                mode: bracketMode,
                quantity: req.body.orderProfitQty,
                orderType: "Limit", 
                limit: req.body.orderProfitLmt,
                stop: 0,
                duration: req.body.orderProfitDur,
                status: bracketStatus,
                parrentOrder: parrentOrderId,
                timePlaced: Date.now()
            })
            //Loss order 
            const lorder = new Order({
                creator: req.user._id,
                account: req.body.account,
                symbol: req.body.symbol,
                mode: bracketMode,
                quantity: req.body.orderLossQty,
                orderType: "Stop", 
                limit: 0,
                stop: req.body.orderLossStp,
                duration: req.body.orderLossDur,
                status: bracketStatus,
                parrentOrder: parrentOrderId,
                timePlaced: Date.now()
            })
            await porder.save()
            await lorder.save()
        }

        req.status(200).send("Success")

    } catch (error) {
        console.log(error)
        res.status(500).send("interal server error")
    }
})



// export the router
module.exports = router