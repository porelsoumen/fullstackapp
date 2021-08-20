const User = require('../models/user')

const usersInDb = async ()  => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const initialUsers = [
    {
        'name': 'Soumen K',
        'username': 'pofd',
        'passwordHash': '$2b$10$DJp94Z8y.hJ7yyc1fzclt.sIOQfnvXGKEX4JJ1qft.KjMn9y9N7BW'
    },
    {
        'name':'testuser',
        'username':'testusername',
        'passwordHash':'$2b$10$9v6s.hMUOLdOYMrbCZGT2OjWUXVovmDKC97niYEOKrNZJnLWKYHO.'
    }
]
module.exports = {
    usersInDb,
    initialUsers
}