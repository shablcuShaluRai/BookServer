const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  books: [
    {
      id:"react",
      name:"react",
      author: "Shalu Rai",
      price:200
    },
    {
      id:"redux",
      name:'redux',
      author:'Sahil Rai',
      price:300
    },
    {
      id:"angular",
      name:"angular",
      author:'Anoop Rai',
      price:100
    }
  ]
}

const get = (token) => {
  let data = db[token]
   if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

const add = (token, book) => {
  if (!book.id) {
    book.id = Math.random().toString(36).substr(-8)
  }
  get(token).books.push(book)
  return book
}

module.exports = {
  get,
  add
}
