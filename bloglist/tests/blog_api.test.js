const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTestHelper = require('./blogtest_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogTestHelper.initialBlogs)
})

describe('some initial blogs saved', () => {
    it('all blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(blogTestHelper.initialBlogs.length)        
    })
    it('checks for the existence of the id property',async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        response.body.map(blog => expect(blog.id).toBeDefined())
    })
})
describe('addition of a new blog', () => {
    it('checks for creation of blog using POST', async () => {
        const newBlog = {
            'title': 'blog title 3',
            'author': 'samadrita',
            'likes': 800,
            'url': 'new url'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const data = response.body.map(r => r.title)
        expect(response.body).toHaveLength(blogTestHelper.initialBlogs.length + 1)
        expect(data).toContain('blog title 3')
    })
})
describe('checks the properties of a blog', () => {
    it('tests for likes default to zero',async () => {
        const newBlog = {
            'title': 'blog title 4',
            'author': 'nepal',
            'url': 'new 1 url'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        expect(response.body.likes).toBe(0)
    })
    it('tests existence of title and url', async () => {
        const newBlog = {
            'author': 'nepal',
            'likes': 97
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})
describe('deletion of a blog', () => {
    it('succeeds with 204 if the id is valid', async () => {
        const blogsAtStart = await blogTestHelper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await blogTestHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogTestHelper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})
describe('view a blog', () => {
    it('should succeed with 200 if the id is valid', async () => {
        const allBlogs = await blogTestHelper.blogsInDb()
        const blogToView = allBlogs[allBlogs.length - 1]

        const response = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(response.body).toEqual(processedBlogToView)
    })
    it('should fail with 404 if the id is invalid', async () => {
        const nonExistingId = await blogTestHelper.nonExistingId()

        await api
            .get(`/api/blogs/${nonExistingId}`)
            .expect(404)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
