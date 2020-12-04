/* Student mongoose model */
const mongoose = require('mongoose')

const U = mongoose.model('user', {
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

module.exports = { U }