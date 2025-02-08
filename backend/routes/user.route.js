const express = require('express')
const UserRoute = express.Router()

const {
  userSignIn,
  userSignUp,
  userUpdate,
  getArticles,
  getArticle,
  commentArticle,
  getComments,
  replyComment,
} = require('../controllers/user.controller.js')

UserRoute.post('/signin', userSignIn)
UserRoute.post('/signup', userSignUp)
UserRoute.put('/update/:id', userUpdate)

UserRoute.get('/articles', getArticles)
UserRoute.get('/articles/:id', getArticle)
UserRoute.post('/articles/:id/comment', commentArticle)
UserRoute.get('/articles/:id/comment', getComments)
UserRoute.post('/articles/:id/comment/:commentId/reply', replyComment)

module.exports = { UserRoute }
