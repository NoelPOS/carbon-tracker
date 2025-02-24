const { client } = require('../db/dbconnect.js')

const {
  adminSignInQuery,
  createTaskQuery,
  createModeratorQuery,
  createBadgeQuery,
  getModeratorsQuery,
  getTasksQuery,
  getBadgesQuery,
  getUsersQuery,
  updateTaskStatus,
  assignTaskQuery,
  checkBadgeQuery,
  assignBadgeQuery,
  updateUserStatusQuery,
  updateModeratorStatusQuery,
  deleteUserQuery,
  deleteModeratorQuery,
  getPendingArticlesQuery,
  updateArticleStatusQuery,
  getQuestionsQuery,
  createQuestionQuery,
  createOptionQuery,
  deleteQuestionQuery,
  getOptionsQuery,
  updateQuestionQuery,
  updateOptionQuery,
  InsertIntoQuestionUpdateQuery,
  InsertIntoModeratorUpdateQuery,
  InsertIntoUserUpdateQuery,
} = require('../queries/admin.js')

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await client.query(adminSignInQuery, [email, password])

    if (admin.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    res.status(200).json(admin.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const { title, instruction, admin_id } = req.body
    const newTask = await client.query(createTaskQuery, [
      title,
      instruction,
      admin_id,
    ])

    res.status(201).json(newTask.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createModerator = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body)
    const newModerator = await client.query(createModeratorQuery, [
      name,
      email,
      password,
    ])

    res.status(201).json(newModerator.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createBadge = async (req, res) => {
  try {
    const { admin_id, name, image } = req.body
    console.log(req.body)

    const newBadge = await client.query(createBadgeQuery, [
      admin_id,
      name,
      image,
    ])
    res.status(201).json(newBadge.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getModerators = async (req, res) => {
  try {
    const moderators = await client.query(getModeratorsQuery)
    res.status(200).json(moderators.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await client.query(getTasksQuery)
    res.status(200).json(tasks.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getBadges = async (req, res) => {
  try {
    const badges = await client.query(getBadgesQuery)
    res.status(200).json(badges.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await client.query(getUsersQuery)
    res.status(200).json(users.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const assignTask = async (req, res) => {
  try {
    const { task_id, moderator_id } = req.body
    // update task status and insert task id and mod id into assign table

    await client.query(updateTaskStatus, ['assigned', task_id])

    await client.query(assignTaskQuery, [task_id, moderator_id])

    res.status(200).json({ message: 'Task assigned successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const assignBadge = async (req, res) => {
  try {
    const { badge_id, user_id } = req.body

    // check if badge already assigned to user
    const check = await client.query(checkBadgeQuery, [badge_id, user_id])
    if (check.rows.length > 0) {
      return res.status(201).json({ message: 'Badge already assigned to user' })
    }

    // insert badge id and user id into reward table
    await client.query(assignBadgeQuery, [badge_id, user_id])

    res.status(200).json({ message: 'Badge assigned successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { user_id, status, admin_id } = req.body
    const user = await client.query(updateUserStatusQuery, [status, user_id])
    await client.query(InsertIntoUserUpdateQuery, [user_id, admin_id])
    res.status(200).json(user.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateModerator = async (req, res) => {
  try {
    const { moderator_id, status, admin_id } = req.body
    const moderator = await client.query(updateModeratorStatusQuery, [
      status,
      moderator_id,
    ])
    await client.query(InsertIntoModeratorUpdateQuery, [moderator_id, admin_id])
    res.status(200).json(moderator.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params
    console.log(req.body)
    const user = await client.query(deleteUserQuery, [user_id])
    res.status(200).json(user.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteModerator = async (req, res) => {
  try {
    const { moderator_id } = req.params
    const moderator = await client.query(deleteModeratorQuery, [moderator_id])
    res.status(200).json(moderator.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getArticles = async (req, res) => {
  try {
    const articles = await client.query(getPendingArticlesQuery, ['pending'])
    res.status(200).json(articles.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { action } = req.body
    const article = await client.query(updateArticleStatusQuery, [action, id])
    res.status(200).json(article.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getQuestions = async (req, res) => {
  try {
    const { rows } = await client.query(getQuestionsQuery)
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createQuestion = async (req, res) => {
  try {
    const { question, admin_id } = req.body
    const newQuestion = await client.query(createQuestionQuery, [
      question,
      admin_id,
    ])
    res.status(201).json(newQuestion.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteQuestion = async (req, res) => {
  try {
    const { question_id } = req.params
    const question = await client.query(deleteQuestionQuery, [question_id])
    res.status(200).json(question.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createOption = async (req, res) => {
  try {
    const { question_id, option_name, carbon_value } = req.body
    const newOption = await client.query(createOptionQuery, [
      question_id,
      option_name,
      carbon_value,
    ])
    res.status(201).json(newOption.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getOptions = async (req, res) => {
  try {
    const { question_id } = req.params
    const options = await client.query(getOptionsQuery, [question_id])
    res.status(200).json(options.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateQuestion = async (req, res) => {
  try {
    const { question_id } = req.params
    const { question, admin_id } = req.body
    const updatedQuestion = await client.query(updateQuestionQuery, [
      question,
      question_id,
    ])
    await client.query(InsertIntoQuestionUpdateQuery, [question_id, admin_id])
    res.status(200).json(updatedQuestion.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateOption = async (req, res) => {
  try {
    const { option_id } = req.params
    const { option_name, carbon_value } = req.body
    const updatedOption = await client.query(updateOptionQuery, [
      option_name,
      carbon_value,
      option_id,
    ])
    res.status(200).json(updatedOption.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  adminSignin,
  createTask,
  createModerator,
  createBadge,
  getModerators,
  getUsers,
  getTasks,
  getBadges,
  assignBadge,
  assignTask,
  updateUser,
  deleteUser,
  getArticles,
  updateArticle,
  getQuestions,
  createQuestion,
  createOption,
  getOptions,
  deleteQuestion,
  updateQuestion,
  updateOption,
  updateModerator,
  deleteModerator,
}
