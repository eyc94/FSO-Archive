require('dotenv').config()
const express = require('express')
// Require morgan middleware: https://github.com/expressjs/morgan
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// This is PART 3.7.
// app.use(morgan('tiny'))
// OR 
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// This is PART 3.8.
// PART 3.8 required me to show payload when making POST requests.
// Create a token to display payload.
// Payload is displayed when we make a POST request to add a person.
morgan.token('payload', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
// Use the morgan middleware tiny configuration with the payload token at the end.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hi Home</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const reqTime = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${reqTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (persons.filter(person => person.name.toLowerCase() === body.name.toLowerCase()).length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (body.number === undefined) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        id: Math.floor(Math.random() * 99999),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})