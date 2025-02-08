const { client } = require('../db/dbconnect.js')

const ModeratorSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    const { rows } = await client.query(
      `SELECT * FROM moderator WHERE email = $1 AND password = $2`,
      [email, password]
    )
    if (rows.length === 0) {
      res.status(401).send('Invalid email or password')
    } else {
      res.status(200).send(rows[0])
    }
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
const getTasks = async (req, res) => {
  try {
    const { moderator_id } = req.body
    console.log(req.body)

    if (!moderator_id) {
      return res.status(400).json({ error: 'Moderator ID is required' })
    }

    // Get all assigned task IDs for this moderator
    const { rows: assignedTasks } = await client.query(
      `SELECT task_id FROM assign WHERE moderator_id = $1`,
      [moderator_id]
    )

    if (assignedTasks.length === 0) {
      return res.status(200).json([]) // No tasks assigned
    }

    // Extract all task_ids
    const taskIds = assignedTasks.map((row) => row.task_id)

    // Fetch all task details in one query
    const { rows: tasks } = await client.query(
      `SELECT * FROM task WHERE task_id = ANY($1)`,
      [taskIds]
    )

    res.status(200).json(tasks)
  } catch (err) {
    console.error('Error fetching tasks:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createArticle = async (req, res) => {
  try {
    const { title, subtitle, description, img_url, moderator_id, task_id } =
      req.body
    console.log(req.body)

    if (!title || !description || !moderator_id) {
      return res
        .status(400)
        .json({ error: 'Title, description and moderator_id are required' })
    }

    // update task status to completed
    await client.query(
      `UPDATE task SET task_status = 'completed' WHERE task_id = $1`,
      [task_id]
    )

    // Insert the new article
    const { rows } = await client.query(
      `INSERT INTO article (title, subtitle, description, img_url, moderator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, subtitle, description, img_url, moderator_id]
    )
    console.log(rows[0])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error('Error creating article:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { ModeratorSignIn, getTasks, createArticle }
