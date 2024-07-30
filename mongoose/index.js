const mongoose = require('mongoose')
const { connect } = mongoose
const uri = require('../uri')
const Blog = require('./model/blog')
const User = require('./model/user')

// Creating a document
async function main() {
    await connect(uri, { dbName: 'blog'})
    console.log('Connected to the database')

    // const user = await User.create({
    //     name: 'Jesse Hall',
    //     email: 'jessehall@email.com'
    // })

    // const article = await Blog.create({
    //     title: 'Awesome Post',
    //     slug: 'awesome-post',
    //     published: true,
    //     author: user._id,
    //     content: 'This is the best post ever',
    //     tags: ['featured', 'announcement']
    // })

    const article = await Blog.findById('66a970f0f1d136d1123e70c3').exec()
    article.title = 'Updated Title'
    await article.save()
    console.log(article)
}
main().catch(err => console.error(err))

