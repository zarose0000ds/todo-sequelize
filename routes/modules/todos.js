const router = require('express').Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id
  const { name } = req.body
  return Todo.create({
    name,
    isDone: false,
    UserId
  }).then(() => res.redirect('/')).catch(e => console.log(e))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id).then(todo => res.render('detail', { todo: todo.toJSON() })).catch(e => console.log(e))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id).then(todo => res.render('edit', { todo: todo.toJSON() })).catch(e => console.log(e))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findByPk(id).then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    todo.save()
  }).then(() => res.redirect(`/todos/${id}`)).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id).then(todo => todo.destroy()).then(() => res.redirect('/')).catch(e => console.log(e))
})

module.exports = router