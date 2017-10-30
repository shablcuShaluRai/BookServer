const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const books = require('./books')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Address Book API!
    The following endpoints are available:

    GET /books
    POST /books { name, author, price }
  </pre>
  `
  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/books', (req, res) => {
  res.send(books.get(req.token))
})


app.post('/books', bodyParser.json(), (req, res) => {
  const { name, author, price } = req.body
  if (name && author && price) {
    res.send(books.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Please provide both a name and email address'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
