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
  checkSession,
  updateProfile,
  getProfile,
} = require('../controllers/moderator.controller.js')

const ModeratorRoute = express.Router()

ModeratorRoute.post('/signin', ModeratorSignIn)
ModeratorRoute.post('/tasks', getTasks)
ModeratorRoute.post('/article/create', createArticle)
ModeratorRoute.get('/article/:article_id', getArticleById)
ModeratorRoute.put('/article/:article_id', updateArticle)
ModeratorRoute.delete('/article/:article_id', deleteArticle)
ModeratorRoute.get('/articles/:moderator_id', getAllArticles)
ModeratorRoute.get('/session/:moderator_id', checkSession)
ModeratorRoute.get('/profile/:moderator_id', getProfile)

ModeratorRoute.delete('/:moderator_id/comment/:comment_id', deleteComment)

ModeratorRoute.put('/profile/update/:moderator_id', updateProfile)

module.exports = { ModeratorRoute }
