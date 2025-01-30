const getAllUsers = 'SELECT * FROM users'

const userSignUpQuery =
  'INSERT INTO users (full_name, email, password, address, phone) VALUES ($1, $2, $3, $4, $5)';


const userSignInQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2'

module.exports = {
  getAllUsers,
  userSignInQuery,
  userSignUpQuery,
}
