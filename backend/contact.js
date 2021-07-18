const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('Error connecting to MongoDB '. error.message)
})

const phonebookSchema = new mongoose.Schema({
    id: Number,
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = new mongoose.model('Contact', phonebookSchema)