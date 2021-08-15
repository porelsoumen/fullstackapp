const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUserData = {
        name: body.name,
        username: body.username,
        passwordHash: passwordHash
    }

    const user = new User(newUserData)
    const result = await user.save()
    response.status(201).json(result)
})

module.exports = usersRouter