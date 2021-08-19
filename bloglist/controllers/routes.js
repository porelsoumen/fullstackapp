const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    if (!body.title && !body.url) {
        return response.status(400).json({ error: 'Missing title & URL'})
    }

    const user = request.user

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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const user = request.user
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