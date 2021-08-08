const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTestHelper = require('./blogtest_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('all blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObj = new Blog(blogTestHelper.initialBlogs[0])
        await blogObj.save()

        blogObj = new Blog(blogTestHelper.initialBlogs[0])
        await blogObj.save()
    })
    it('checks for getting all blogs in json', async () => {
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
    it.only('tests for likes default to zero',async () => {
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
    afterAll(() => {
        mongoose.connection.close()
    })
})
