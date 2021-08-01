const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    }).catch(error => {
        console.log('Error connecting to MongoDB ', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    id: {type: String, unique: true },
    name: {type: String, required: true, unique: true, minLength: 3 },
    number: {type: String, required: true, unique: true, minLength: 8 },
})
phonebookSchema.plugin(uniqueValidator)
phonebookSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = new mongoose.model('Contact', phonebookSchema)