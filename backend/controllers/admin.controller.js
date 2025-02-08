const { client } = require('../db/dbconnect.js')

const { adminSignInQuery } = require('../queries/admin.js')

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
    const newTask = await client.query(
      'INSERT INTO Task (task_title, task_desc, admin_id) VALUES ($1, $2, $3) RETURNING *',
      [title, instruction, admin_id]
    )

    res.status(201).json(newTask.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createModerator = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body)
    const newModerator = await client.query(
      'INSERT INTO Moderator (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    )

    res.status(201).json(newModerator.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createBadge = async (req, res) => {
  try {
    const { admin_id, name, image } = req.body
    console.log(req.body)

    const newBadge = await client.query(
      'INSERT INTO Badge (admin_id, badge_desc, badge_url) VALUES ($1, $2, $3) RETURNING *',
      [admin_id, name, image]
    )
    res.status(201).json(newBadge.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getModerators = async (req, res) => {
  try {
    const moderators = await client.query('SELECT * FROM Moderator')
    res.status(200).json(moderators.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await client.query(
      'SELECT * FROM Task WHERE task_status = $1',
      ['unassigned']
    )
    res.status(200).json(tasks.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getBadges = async (req, res) => {
  try {
    const badges = await client.query('SELECT * FROM Badge')
    res.status(200).json(badges.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await client.query('SELECT * FROM Users')
    res.status(200).json(users.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const assignTask = async (req, res) => {
  try {
    const { task_id, moderator_id } = req.body
    // update task status and insert task id and mod id into assign table

    const task = await client.query(
      'UPDATE Task SET task_status = $1 WHERE task_id = $2 RETURNING *',
      ['assigned', task_id]
    )

    const assign = await client.query(
      'INSERT INTO Assign (task_id, moderator_id) VALUES ($1, $2) RETURNING *',
      [task_id, moderator_id]
    )

    res.status(200).json({ message: 'Task assigned successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const assignBadge = async (req, res) => {
  try {
    const { badge_id, user_id } = req.body

    // check if badge already assigned to user
    const check = await client.query(
      'SELECT * FROM Reward WHERE badge_id = $1 AND user_id = $2',
      [badge_id, user_id]
    )
    if (check.rows.length > 0) {
      return res.status(201).json({ message: 'Badge already assigned to user' })
    }

    // insert badge id and user id into reward table
    const assign = await client.query(
      'INSERT INTO Reward (badge_id, user_id) VALUES ($1, $2) RETURNING *',
      [badge_id, user_id]
    )

    res.status(200).json({ message: 'Badge assigned successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { user_id, status } = req.body
    const user = await client.query(
      'UPDATE Users SET status = $1 WHERE user_id = $2 RETURNING *',
      [status, user_id]
    )
    res.status(200).json(user.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params
    console.log(req.body)
    const user = await client.query(
      'DELETE FROM Users WHERE user_id = $1 RETURNING *',
      [user_id]
    )
    res.status(200).json(user.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getArticles = async (req, res) => {
  try {
    const articles = await client.query(
      'SELECT * FROM Article WHERE status = $1',
      ['pending']
    )
    res.status(200).json(articles.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { action } = req.body
    const article = await client.query(
      'UPDATE Article SET status = $1 WHERE article_id = $2 RETURNING *',
      [action, id]
    )
    res.status(200).json(article.rows[0])
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
}
