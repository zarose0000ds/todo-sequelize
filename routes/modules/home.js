const router = require('express').Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  }).then(todos => res.render('index', { todos })).catch(e => res.status(422).json(e))
})

module.exports = router