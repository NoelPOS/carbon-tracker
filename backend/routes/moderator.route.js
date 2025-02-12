const express = require('express')

const {
  ModeratorSignIn,
  getTasks,
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteComment,
} = require('../controllers/moderator.controller.js')

const ModeratorRoute = express.Router()

ModeratorRoute.post('/signin', ModeratorSignIn)
ModeratorRoute.post('/tasks', getTasks)
ModeratorRoute.post('/article/create', createArticle)
ModeratorRoute.get('/article/:article_id', getArticleById)
ModeratorRoute.put('/article/:article_id', updateArticle)
ModeratorRoute.delete('/article/:article_id', deleteArticle)
ModeratorRoute.get('/articles/:moderator_id', getAllArticles)


ModeratorRoute.delete('/comment/:comment_id', deleteComment)

module.exports = { ModeratorRoute }
