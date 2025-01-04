const express = require('express')
const UserRoute = express.Router()

const { userSignIn, userSignUp } = require('../controllers/user.controller.js')

UserRoute.post('/signin', userSignIn)
UserRoute.post('/signup', userSignUp)

module.exports = { UserRoute }
