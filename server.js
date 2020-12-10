/* server.js - user & resource authentication */
// Modular version, with express routes imported separately.

'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// express-session for managing user sessions
const session = require('express-session')

// Create a session cookie
app.use(session({
    secret: 'our hardcoded secret', // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000, // 100 minute expiry
        httpOnly: true // important: saves it in browser's memory - not accessible by javascript (so it can't be easily stolen!).
    }
}));

// Order Handle Functions
const {serverTickOrderHandler, serverDailyOrderExpireHandler} = require("./orderHandler")

/** Import the various routes **/
// User and login routes
app.use(require('./routes/user'))
// Account API routes
app.use(require('./routes/accounts'))
// Positions API routes
app.use(require('./routes/positions'))
// Activities API routes
app.use(require('./routes/activities'))
// Orders API routes
app.use(require('./routes/orders'))
// Dashboard API routes
app.use(require('./routes/dashboardApi'))
// Trading API routes
app.use(require('./routes/tradingApi'))



// 404 route at the bottom for anything not found.
app.get('*', (req, res) => {
  res.status(404).send("404 Error: We cannot find the page you are looking for.");
  // you could also send back a fancy 404 webpage here.
});


// ********** SPINNING SERVER JOBS ****************
setInterval(serverTickOrderHandler, 5000) // loops over orders and excecute.
setInterval(serverDailyOrderExpireHandler, 1000 * 60 * 60 * 24) // loops over orders and check for expired.  // Make cron job if have time.



/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 