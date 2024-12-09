// convert to CommonJS:
const express = require('express')
const cors = require('cors')
const { client } = require('./db/dbconnect.js')
const { getAllUsers } = require('./queries/users.js')

const app = express()
app.use(cors())

client.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users', async (req, res) => {
  try {
    const result = await client.query(getAllUsers)
    res.json(result.rows)
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  } finally {
    // client.end()
    console.log('query finished')
  }
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
