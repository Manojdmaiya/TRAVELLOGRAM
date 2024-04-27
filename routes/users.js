const express = require('express')
const router = express.Router()
const passport = require('passport')
const { storeReturnTo } = require('../middleware')
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))

const authenticate = passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true,
})

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureMessage: true,
    }),
    users.login
  )

router.get('/logout', users.logout)

module.exports = router
