const app = require('../app')
const mongoose = require('mongoose')
const userTestHelper = require('./usertest_helper')
const supertest = require('supertest')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(userTestHelper.initialUsers)
})
describe('creation of invalid user', () => {
    it('should check that username should be minimum 3 chars', async () => {
        const usersBefore = await userTestHelper.usersInDb()
        
        const newUser = {
            name: 'Anc',
            username: 'ad',
            password: 'uiua'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('is shorter than the minimum allowed length (3)')
        const usersAtEnd = await userTestHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersBefore.length)
    })
    it('should check that username should be unique', async () => {
        const usersBefore = await userTestHelper.usersInDb()
        
        const newUser = {
            name: 'Anc',
            username: userTestHelper.initialUsers[0].username,
            password: 'hiuashfiusdhiosuhf',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await userTestHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersBefore.length)
    })  
})
describe('creation of a valid user', () => {
    it('should create a new valid user', async () => {
        const usersBefore = await userTestHelper.usersInDb()
        
        const newUser = {
            name: 'testuser1',
            username: 'testusername1',
            password: 'testuserpassword1',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await userTestHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersBefore.length + 1)
    })
})
afterAll(async () => {
    await User.deleteMany({})
    mongoose.connection.close()
})