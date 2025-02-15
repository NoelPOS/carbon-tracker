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
  const { search } = req.query
  if (search) {
    try {
      const { rows: articles } = await client.query(
        `SELECT * FROM article WHERE title ILIKE $1 AND status = $2`,
        [`%${search}%`, 'approved']
      )

      res.status(200).json(articles)
    } catch (err) {
      console.error('Error fetching articles:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
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

const getReplies = async (req, res) => {
  try {
    const { commentId } = req.params
    const { rows: replies } = await client.query(
      `SELECT * FROM reply WHERE comment_id = $1`,
      [commentId]
    )
    res.status(200).json(replies)
  } catch (err) {
    console.error('Error fetching replies:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getQuestions = async (req, res) => {
  try {
    const { rows: questions } = await client.query(`SELECT * FROM question`)
    res.status(200).json(questions)
  } catch (err) {
    console.error('Error fetching questions:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const saveRecord = async (req, res) => {
  try {
    const { user_id, carbon_amount } = req.body
    const { rows: records } = await client.query(
      `INSERT INTO SurveyRecord (user_id, carbon_amount) VALUES ($1, $2) RETURNING *`,
      [user_id, carbon_amount]
    )
    res.status(201).json(records[0])
  } catch (err) {
    console.error('Error saving record:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getRecords = async (req, res) => {
  try {
    const { user_id } = req.params
    const { rows: records } = await client.query(
      `SELECT * FROM SurveyRecord WHERE user_id = $1`,
      [user_id]
    )
    res.status(200).json(records)
  } catch (err) {
    console.error('Error fetching records:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const userStreakUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { last_survey, streak } = req.body
    const { rows: users } = await client.query(
      `UPDATE users SET last_survey = $1, streak_day = $2 WHERE user_id = $3 RETURNING *`,
      [last_survey, streak, id]
    )
    res.status(200).json(users[0])
  } catch (err) {
    console.error('Error updating streak:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getLeaderboardByName = async (req, res) => {
  try {
    const { rows: users } = await client.query(
      `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id GROUP BY fullname, streak_day ORDER BY fullname ASC`
    )
    res.status(200).json(users)
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getLeaderboardByAvgCarbon = async (req, res) => {
  try {
    const { rows: users } = await client.query(
      `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id GROUP BY fullname, streak_day ORDER BY avg DESC`
    )
    res.status(200).json(users)
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getLeaderboardByStreak = async (req, res) => {
  try {
    const { rows: users } = await client.query(
      `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id GROUP BY fullname, streak_day ORDER BY streak DESC`
    )
    res.status(200).json(users)
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// -- Badge Table
// CREATE TABLE Badge (
//     badge_id SERIAL PRIMARY KEY,
//     badge_url VARCHAR(255),
//     badge_desc TEXT,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Reward Table (Links Badges to Users)
// CREATE TABLE Reward (
//     badge_id INT REFERENCES Badge(badge_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (badge_id, user_id)
// );

// -- Users Table
// CREATE TABLE Users (
//     user_id SERIAL PRIMARY KEY,
//     fullname VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     address VARCHAR(255),
//     phone_number VARCHAR(20),
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
//     streak_day INT DEFAULT 0,
//     last_survey DATE
// );

// wrtie get badge query by using JOIN of user, badge and reward and not use * sign in query

const getBadge = async (req, res) => {
  try {
    const { user_id } = req.params
    const { rows: badges } = await client.query(
      `SELECT badge_id, badge_url, badge_desc FROM Badge JOIN Reward ON Badge.badge_id = Reward.badge_id WHERE user_id = $1`,
      [user_id]
    )
    res.status(200).json(badges)
  } catch (err) {
    console.error('Error fetching badges:', err)
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
  getReplies,
  getQuestions,
  saveRecord,
  getRecords,
  userStreakUpdate,
  getLeaderboardByName,
  getLeaderboardByAvgCarbon,
  getLeaderboardByStreak,
  getBadge,
}
