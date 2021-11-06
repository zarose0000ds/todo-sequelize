const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')

router.use('/users', users)
router.use('/todos', todos)
router.use('/', home)

module.exports = router