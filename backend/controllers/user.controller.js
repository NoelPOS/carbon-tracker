const { client } = require('../db/dbconnect.js')

const {
  userSignInQuery,
  userSignUpQuery,
  userUpdateQuery,
} = require('../queries/users.js')

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await client.query(userSignInQuery, [email, password])

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const userSignUp = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    result = await client.query(userSignUpQuery, [
      name,
      email,
      password,
      address,
      phone,
    ])

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error in userSignUp:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, address, phone } = req.body

    const result = await client.query(userUpdateQuery, [
      name,
      email,
      password,
      address,
      phone,
      id,
    ])

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error('Error in userUpdate:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getArticles = async (req, res) => {
  try {
    const { rows: articles } = await client.query(
      `SELECT * FROM article WHERE status = $1`,
      ['approved']
    )

    res.status(200).json(articles)
  } catch (err) {
    console.error('Error fetching articles:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { rows: articles } = await client.query(
      `SELECT * FROM article WHERE article_id = $1`,
      [id]
    )

    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article not found' })
    }

    res.status(200).json(articles[0])
  } catch (err) {
    console.error('Error fetching article:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const commentArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { user_id, content } = req.body

    const { rows: comments } = await client.query(
      `INSERT INTO comment (content, article_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [content, id, user_id]
    )

    res.status(201).json(comments[0])
  } catch (err) {
    console.error('Error commenting article:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getComments = async (req, res) => {
  try {
    const { id } = req.params
    const { rows: comments } = await client.query(
      `SELECT * FROM comment WHERE article_id = $1`,
      [id]
    )

    res.status(200).json(comments)
  } catch (err) {
    console.error('Error fetching comments:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const replyComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const { user_id, content } = req.body

    const { rows: replies } = await client.query(
      `INSERT INTO reply (content, comment_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [content, commentId, user_id]
    )

    res.status(201).json(replies[0])
  } catch (err) {
    console.error('Error replying to comment:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  userSignIn,
  userSignUp,
  userUpdate,
  getArticles,
  getArticle,
  commentArticle,
  getComments,
  replyComment,
}
