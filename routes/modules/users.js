const router = require('express').Router()
const passport = require('passport')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}), (req, res) => {})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists!')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt)).then(hash => User.create({
      name,
        email,
        password: hash
      })).then(() => res.redirect('/')).catch(e => console.log(e))
  })
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router