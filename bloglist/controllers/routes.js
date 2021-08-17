const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title && !body.url) {
        return response.status(400).json({ error: 'Missing title & URL'})
    }
    const users = await User.find({})

    if (!body.likes) {
        body.likes = 0
    }
    body.user = users[0]._id
    const blog = new Blog(body)
  
    const result = await blog.save()
    users[0].blogs = users[0].blogs.concat(result._id)
    await users[0].save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
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