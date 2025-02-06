const { client } = require('../db/dbconnect.js')

const { userSignInQuery, userSignUpQuery, userUpdateQuery } = require('../queries/users.js')

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
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    result = await client.query(userSignUpQuery, [name, email, password, address, phone]);

    res.status(201).json(result.rows[0] );
  } catch (err) {
    console.error('Error in userSignUp:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, address, phone } = req.body;

    const result = await client.query(userUpdateQuery, [name, email, password, address, phone, id]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error in userUpdate:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { userSignIn, userSignUp, userUpdate }
