require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./Contact')
app.use(express.static('build'))
app.use(cors())
// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const jsonParser = express.json()

// let persons = [
// {
//     id: 1,
//         name: 'Arto Hellas',
//     number: '040-123456'
// },
// {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523'
// },
// {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345'
// },
// {
//     id: 4,
//     name: 'Mary Poppendick',
//     number: '39-23-6423122'
// }]

// app.get('/', (request, response) => {
//     response.send('ok')
// })

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/info', (request,response) => {
    Contact.find({}).then(contacts => {
        response.send('Phonebook has info for ' + contacts.length + ' people<br>' + new Date)
    })
})

// app.get('/api/person/:id', (req,res) => {
//     const id = Number(req.params.id)
//     const person = persons.find(person => person.id === id)

//     if (person) {
//         res.json(person)
//     } else {
//         res.status(404).end()
//     }

// })

// app.delete('/api/person/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const personToDelete = persons.find(person => person.id === id)

//     if (personToDelete) {
//         persons = persons.filter(person => person.id !== id)
//         response.status(204).end()
//     } else {
//         response.status(404).end()
//     }
// })

app.post('/api/persons', jsonParser, (request,response, next) => {
    const body = request.body

    // const idx = persons.findIndex(person => person.name === body.name)
    // if (idx !== -1) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
    
    // const maxId = persons.length == 0 ? 0 : Math.max(...persons.map(n => n.id))
    // const id = Math.floor(Math.random()*100 + maxId)
    const person = new Contact({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedContact => {
        response.json(savedContact)
    })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error.message)
            response.status(400).send({error: 'malformatted id'})
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        }).catch(error => {
            console.log(error.message)
            next(error)
        })
})

app.put('/api/persons/:id', jsonParser, (request, response, next) => {
    const body = request.body
    console.log(body)
    if (!body.number) {
        response.status(400).send({error: 'missing number'})
    }

    const person = {
        name: body.name,
        number: body.number
    }
    Contact.findByIdAndUpdate(request.params.id, person, {'new': true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            console.log(error.message)
            next(error)
        })
})
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error:'malformatted id'})
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}
app.use(errorHandler)

const PORT=process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})