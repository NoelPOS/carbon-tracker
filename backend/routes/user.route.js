const express = require('express')
const UserRoute = express.Router()

const { userSignIn, userSignUp, userUpdate } = require('../controllers/user.controller.js')

UserRoute.post('/signin', userSignIn)
UserRoute.post('/signup', userSignUp)
UserRoute.put('/update/:id', userUpdate)

module.exports = { UserRoute }
