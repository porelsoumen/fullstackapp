const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTestHelper = require('./blogtest_helper')

const api = supertest(app)

describe('all blogs', () => {
    it('checks for getting all blogs in json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(0)        
    }, 100000)

    afterAll(() => {
        mongoose.connection.close()
    })
})
