  
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const categoriesRouter = require('../routes/categories-routes')
const recipesRouter = require('../routes/recipes-routes')
const authRouter = require('../auth/auth-routes')
const usersRouter = require('../routes/users-routes')
const restricted = require('../auth/restricted-middleware')

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.json({ message: 'I am Son of Hal and am always watching!' })
})

server.use('/api/auth', authRouter)
server.use('/api/category', restricted, categoriesRouter)
server.use('/api/recipes', restricted, recipesRouter)
server.use('/api/users', restricted, usersRouter)

module.exports = server