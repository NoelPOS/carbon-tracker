import { Link } from 'react-router-dom'

const stats = {
  totalUsers: 125,
  totalModerators: 125,
}

export default function Dashboard() {
  return (
    <div className='space-y-8'>
      {/* Stats Section */}
      <div className='grid gap-6 sm:grid-cols-2'>
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Total Users</h2>
          <p className='mt-2 text-3xl font-bold'>{stats.totalUsers} users</p>
          <Link
            to='/admin/users'
            className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
          >
            Manage Users
          </Link>
        </div>
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Total Moderators</h2>
          <p className='mt-2 text-3xl font-bold'>
            {stats.totalModerators} moderators
          </p>
          <Link
            to='/admin/moderators'
            className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
          >
            Manage Moderators
          </Link>
        </div>
      </div>

      {/* Actions Section */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Create New Moderator */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold'>Create New Moderator</h3>
          <p className='mt-1 text-sm text-gray-600'>
            Fill down your moderator info.
          </p>
          <form className='mt-4 space-y-4'>
            <input
              type='text'
              placeholder='Name'
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
              Create
            </button>
          </form>
        </div>

        {/* Assign Task */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold'>Assign Task to Moderator</h3>
          <p className='mt-1 text-sm text-gray-600'>
            Assign your moderators what to write
          </p>
          <form className='mt-4 space-y-4'>
            <select className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <option value=''>Select a moderator from the list</option>
            </select>
            <input
              type='text'
              placeholder='Article Title'
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <textarea
              placeholder='Instruction'
              rows={3}
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
              Assign
            </button>
          </form>
        </div>

        {/* Provide Badge */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold'>Provide Badge to User</h3>
          <p className='mt-1 text-sm text-gray-600'>
            Provide badge to good users
          </p>
          <form className='mt-4 space-y-4'>
            <select className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <option value=''>Select a user from the list</option>
            </select>
            <select className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <option value=''>Select a badge</option>
            </select>
            <textarea
              placeholder='Description or Message to User'
              rows={3}
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
              Assign
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
