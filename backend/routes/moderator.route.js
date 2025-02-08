const express = require('express')

const {
  ModeratorSignIn,
  getTasks,
  createArticle,
} = require('../controllers/moderator.controller.js')

const ModeratorRoute = express.Router()

ModeratorRoute.post('/signin', ModeratorSignIn)
ModeratorRoute.post('/tasks', getTasks)
ModeratorRoute.post('/article/create', createArticle)

module.exports = { ModeratorRoute }
