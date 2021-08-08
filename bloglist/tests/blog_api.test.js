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

    
    afterAll(() => {
        mongoose.connection.close()
    })
})
