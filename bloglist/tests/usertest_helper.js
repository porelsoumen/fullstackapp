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
        'name': 'Soumen P',
        'username': 'pofsdf',
        'passwordHash': '$2b$10$b3n52jzqqkZuNf4mLmvE3OWd.5xD6LUxU2aBecxqtgW.YuVyjfMr2'
    }
]
module.exports = {
    usersInDb,
    initialUsers
}