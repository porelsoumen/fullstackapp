const express = require('express')
const { request, response } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const jsonParser = express.json()

let persons = [
{
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
},
{
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
},
{
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
},
{
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
}]

app.get('/', (request, response) => {
    response.send('ok')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
    
    response.send('Phonebook has info for ' + persons.length + ' people<br>' + new Date)
})

app.get('/api/person/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    const personToDelete = persons.find(person => person.id === id)

    if (personToDelete) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', jsonParser, (request,response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
    
      return  response.status(400).json({
                error: 'name or number is missing'
            })
    }

    const idx = persons.findIndex(person => person.name === body.name)
    if (idx !== -1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const maxId = persons.length == 0 ? 0 : Math.max(...persons.map(n => n.id))
    const id = Math.floor(Math.random()*100 + maxId)
    const person = {
        id: id,
        ...body
    }

    persons.concat(person)
    console.log(person)

    response.status(201).end()
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})