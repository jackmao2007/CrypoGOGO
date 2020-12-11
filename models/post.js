/* Post model */

'use strict';

const mongoose = require('mongoose')

// subdocument of post
const CommentShema = new mongoose.Schema({
    postBelongTo: {
        type: mongoose.Schema.Types.ObjectId
    },
    commentDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    author: {
        // type: mongoose.Schema.Types.ObjectId,
        // required: true
        type: Number
    },
    commentContent: {
        type: String,
        required: true,
        minlength: 1
    }
})

const Post = mongoose.model('Post', {
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    author: {
        // type: mongoose.Schema.Types.ObjectId,
        // required: true
        type: Number
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
    },
    comments: [CommentShema]
})

module.exports = { Post }