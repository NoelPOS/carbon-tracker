import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users')
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Just Demo User Testing</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
