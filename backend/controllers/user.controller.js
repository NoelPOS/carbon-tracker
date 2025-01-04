const { client } = require('../db/dbconnect.js')

const { userSignInQuery, userSignUpQuery } = require('../queries/users.js')

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
  } finally {
    // client.end()
  }
}

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    await client.query(userSignUpQuery, [name, email, password])
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  } finally {
  }
}

module.exports = { userSignIn, userSignUp }
