/* Post model */

'use strict';

const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    top: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    }
})

module.exports = { Post }