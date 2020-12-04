const mongoose = require('mongoose')

const UserApi = mongoose.model('user', {
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

module.exports = { UserApi }