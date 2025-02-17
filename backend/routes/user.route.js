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
  getReplies,
  getQuestions,
  saveRecord,
  getRecords,
  userStreakUpdate,
  getLeaderboardByName,
  getLeaderboardByAvgCarbon,
  getLeaderboardByStreak,
  getBadge,
  getProfile,
  checkSession,
} = require('../controllers/user.controller.js')

UserRoute.post('/signin', userSignIn)
UserRoute.post('/signup', userSignUp)
UserRoute.put('/update/:id', userUpdate)
UserRoute.get('/profile/:id', getProfile)

UserRoute.get('/articles', getArticles)
UserRoute.get('/articles/:id', getArticle)
UserRoute.post('/articles/:id/comment', commentArticle)
UserRoute.get('/articles/:id/comment', getComments)
UserRoute.post('/articles/:id/comment/:commentId/reply', replyComment)
UserRoute.get('/articles/:id/comment/:commentId/reply', getReplies)

UserRoute.get('/questions', getQuestions)
UserRoute.post('/save-record', saveRecord)
UserRoute.get('/records/:user_id', getRecords)
UserRoute.put('/streakupdate/:id', userStreakUpdate)

UserRoute.get('/leaderboard/name', getLeaderboardByName)
UserRoute.get('/leaderboard/avgcarbon', getLeaderboardByAvgCarbon)
UserRoute.get('/leaderboard/streak', getLeaderboardByStreak)

UserRoute.get('/badge/:user_id', getBadge)

UserRoute.get('/session/:user_id', checkSession)

module.exports = { UserRoute }
