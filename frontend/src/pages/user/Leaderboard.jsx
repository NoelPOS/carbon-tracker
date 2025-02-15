import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [sortKey, setSortKey] = useState('name')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/leaderboard/name`
        )
        console.log('Users:', res.data)
        setUsers(res.data)
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }
    fetchUsers()
  }, [])

  const sortName = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/leaderboard/name`
      )
      console.log('Users:', res.data)
      setUsers(res.data)
      setSortKey('name')
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  const sortAvgCarbon = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/leaderboard/avgcarbon`
      )
      console.log('Users:', res.data)
      setUsers(res.data)
      setSortKey('avgCarbon')
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  const sortStreak = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/leaderboard/streak`
      )
      console.log('Users:', res.data)
      setUsers(res.data)
      setSortKey('streak')
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-2xl font-bold'>Leaderboard</h1>

      <div className='mb-4 flex space-x-4'>
        <button
          onClick={sortName}
          className={`rounded-md px-4 py-2 text-sm ${
            sortKey === 'name' ? 'bg-gray-200' : 'bg-gray-100'
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={sortAvgCarbon}
          className={`rounded-md px-4 py-2 text-sm ${
            sortKey === 'avgCarbon' ? 'bg-gray-200' : 'bg-gray-100'
          }`}
        >
          Sort by Avg Carbon Footprint
        </button>
        <button
          onClick={sortStreak}
          className={`rounded-md px-4 py-2 text-sm ${
            sortKey === 'streak' ? 'bg-gray-200' : 'bg-gray-100'
          }`}
        >
          Sort by Streak
        </button>
      </div>

      <div className='overflow-hidden rounded-lg bg-white shadow'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Average Carbon Footprint
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Current Streak
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {users.map((user, index) => (
              <tr key={user.fullname}>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='flex items-center'>
                    <span className='mr-2 text-gray-500'>{user.fullname}</span>
                    <span className='font-medium'>{user.name}</span>
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-500'>
                  {user.avg.slice(0, 6)}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-500'>
                  {user.streak}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
