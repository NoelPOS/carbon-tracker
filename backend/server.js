// convert to CommonJS:
const express = require('express')
const cors = require('cors')

const { client } = require('./db/dbconnect.js')

const { UserRoute } = require('./routes/user.route.js')
const { AdminRoute } = require('./routes/admin.route.js')
const { ModeratorRoute } = require('./routes/moderator.route.js')

const app = express()

client.connect()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use('/api/users', UserRoute)
app.use('/api/admin', AdminRoute)
app.use('/api/moderator', ModeratorRoute)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
