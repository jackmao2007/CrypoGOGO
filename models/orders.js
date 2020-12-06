  
/* Orders mongoose model */
const mongoose = require('mongoose')

const Account = mongoose.model('Account', {
	account: {
		type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mode: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    orderType: {
        type: String,
        required: true,
    },
    limit: {
        type: Number
    },
    stop: {
        type: Number
    },
    duration: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    parentOrder: {
        type: mongoose.Schema.Types.ObjectId // ID of another order, used if bracket order.
    }
})

module.exports = { Account }