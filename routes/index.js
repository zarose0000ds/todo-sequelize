const router = require('express').Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')

router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router