const Blog = require('../models/blog')

const initialBlogs = [
    {
        'title': 'blog title 2',
        'author': 'sohini',
        'likes': 80,
        'url': 'another url'
    },
    {
        'title': 'blog title 1',
        'author': 'soumen',
        'likes': 8,
        'url': 'some url'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}