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

const nonExistingId = async () => {
    const blog = new Blog({ title: 'josijf', url: 'hfiuashdf', likes: 87})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}
module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingId
}