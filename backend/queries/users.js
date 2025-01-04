const getAllUsers = 'SELECT * FROM users'

const userSignUpQuery =
  'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)'

const userSignInQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2'

module.exports = {
  getAllUsers,
  userSignInQuery,
  userSignUpQuery,
}
