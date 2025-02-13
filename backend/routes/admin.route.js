const express = require('express')
const {
  adminSignin,
  createTask,
  createModerator,
  createBadge,
  getModerators,
  getTasks,
  getBadges,
  getUsers,
  assignBadge,
  assignTask,
  updateUser,
  deleteUser,
  getArticles,
  updateArticle,
  getQuestions,
  createQuestion,
  deleteQuestion,
  createOption,
  getOptions,
  updateQuestion,
  updateOption,
} = require('../controllers/admin.controller.js')

const AdminRoute = express.Router()

AdminRoute.post('/signin', adminSignin)
AdminRoute.post('/create/task', createTask)
AdminRoute.post('/create/moderator', createModerator)
AdminRoute.post('/create/badge', createBadge)

AdminRoute.get('/moderators', getModerators)
AdminRoute.get('/users', getUsers)
AdminRoute.get('/tasks', getTasks)
AdminRoute.get('/badges', getBadges)

AdminRoute.post('/assign/task', assignTask)
AdminRoute.post('/assign/badge', assignBadge)

AdminRoute.put('/update/user', updateUser)
AdminRoute.delete('/delete/user/:user_id', deleteUser)

AdminRoute.get('/articles', getArticles)
AdminRoute.put('/article/:id', updateArticle)

AdminRoute.get('/questions', getQuestions)
AdminRoute.post('/questions/create', createQuestion)
AdminRoute.delete('/questions/delete/:question_id', deleteQuestion)
AdminRoute.put('/questions/update/:question_id', updateQuestion)

AdminRoute.post('/options/create', createOption)
AdminRoute.get('/options/:question_id', getOptions)
AdminRoute.put('/options/update/:option_id', updateOption)

module.exports = { AdminRoute }
