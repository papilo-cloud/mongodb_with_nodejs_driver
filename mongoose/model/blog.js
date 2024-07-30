const mongoose = require('mongoose')

const { Schema, model, SchemaTypes } = mongoose

const blogSchema = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [
        {
            user: {
                type: SchemaTypes.ObjectId,
                ref: 'User',
                required: true
            },
            content: String,
            votes: Number
        }
    ]
})

blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

const Blog = model('Blog', blogSchema)
module.exports = Blog