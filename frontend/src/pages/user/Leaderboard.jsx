import { useState } from 'react'

const users = [
  { name: 'Alex Green', avgCarbon: '12.5 kg', streak: '15 days' },
  { name: 'Jamie Blue', avgCarbon: '13.2 kg', streak: '12 days' },
  { name: 'Sam Brown', avgCarbon: '14.1 kg', streak: '7 days' },
  { name: 'Alex White', avgCarbon: '12.2 kg', streak: '5 days' },
  { name: 'Jamie Yellow', avgCarbon: '13.8 kg', streak: '4 days' },
  { name: 'Sam Gold', avgCarbon: '14.4 kg', streak: '1 days' },
]

export default function Leaderboard() {
  const [sortKey, setSortKey] = useState('name')

  const sortedUsers = [...users].sort((a, b) => {
    switch (sortKey) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'avgCarbon':
        return parseFloat(a.avgCarbon) - parseFloat(b.avgCarbon)
      case 'streak':
        return parseInt(a.streak) - parseInt(b.streak)
      default:
        return 0
    }
  })

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-2xl font-bold'>Leaderboard</h1>

      <div className='mb-4 flex space-x-4'>
        <button
          onClick={() => setSortKey('name')}
          className={`rounded-md px-4 py-2 text-sm ${
            sortKey === 'name' ? 'bg-gray-200' : 'bg-gray-100'
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortKey('avgCarbon')}
          className={`rounded-md px-4 py-2 text-sm ${
            sortKey === 'avgCarbon' ? 'bg-gray-200' : 'bg-gray-100'
          }`}
        >
          Sort by Avg Carbon Footprint
        </button>
        <button
          onClick={() => setSortKey('streak')}
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
            {sortedUsers.map((user, index) => (
              <tr key={user.name}>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='flex items-center'>
                    <span className='mr-2 text-gray-500'>{index + 1}.</span>
                    <span className='font-medium'>{user.name}</span>
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-500'>
                  {user.avgCarbon}
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
