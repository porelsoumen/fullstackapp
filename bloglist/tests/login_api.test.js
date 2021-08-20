const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const userTestHelper = require('./usertest_helper')
const User = require('../models/user')
const api = supertest(app)
beforeAll(async () => {
    await User.deleteMany({})
    await User.insertMany(userTestHelper.initialUsers)
})
describe('get auth token for a valid user', () => {
    it('should generate a token for a valid user', async () => {
        
        const user = {
            username: 'testusername',
            password: 'testuserpassword',
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.username).toBe('testusername')
    })
})
afterAll(async () => {
    await User.deleteMany({})
    mongoose.connection.close()
})