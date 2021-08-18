const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title && !body.url) {
        return response.status(400).json({ error: 'Missing title & URL'})
    }
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(400).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if (!body.likes) {
        body.likes = 0
    }
    body.user = user._id
    const blog = new Blog(body)
  
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user.id !== blog.user.toString()) {
        return response.status(401).json({error: 'unauthorized to perform delete'})
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'Invalid Id'})
    }
    response.status(200).json(blog)
})

module.exports = blogRouter