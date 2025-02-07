const express = require('express')

const { ModeratorSignIn, getTasks } = require('../controllers/moderator.controller.js')

const ModeratorRoute = express.Router()


ModeratorRoute.post('/signin',ModeratorSignIn)
ModeratorRoute.post('/tasks', getTasks)


module.exports = { ModeratorRoute }