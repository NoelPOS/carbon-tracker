import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [badges, setBadges] = useState([])
  const [moderators, setModerators] = useState([])
  const [users, setUsers] = useState([])
  const [adminInfo, setAdminInfo] = useState({
    admin_id: 0,
    email: '',
    password: '',
  })
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalModerators: 0,
  })

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    if (admin) {
      setAdminInfo(admin)
    }
  }, [])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/tasks')
        setTasks(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchBadges = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/badges')
        setBadges(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchModerators = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/admin/moderators'
        )
        setModerators(res.data)
        setStats((prev) => ({ ...prev, totalModerators: res.data.length }))
      } catch (err) {
        console.log(err)
      }
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/users')
        setUsers(res.data)
        setStats((prev) => ({ ...prev, totalUsers: res.data.length }))
      } catch (err) {
        console.log(err)
      }
    }

    fetchTasks()
    fetchBadges()
    fetchModerators()
    fetchUsers()
  }, [])

  const handleCreateTask = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title')
    const instruction = formData.get('instruction')
    form.reset()
    try {
      const res = await axios.post(
        'http://localhost:3000/api/admin/create/task',
        {
          admin_id: adminInfo.admin_id,
          title,
          instruction,
        }
      )
      console.log(res.data)
      setTasks([...tasks, res.data])
      alert('Task created successfully')
    } catch (err) {
      console.log(err)
    }
  }

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'carbon_tracker')
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dlprlndi6/image/upload`,
        formData
      )
      console.log(res.data.secure_url)
      return res.data.secure_url
    } catch (err) {
      console.log('Image upload error:', err)
      return null
    }
  }

  const handleCreateBadge = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const description = formData.get('description')
    const image = formData.get('image')
    form.reset()

    const imageUrl = await uploadImageToCloudinary(image)
    try {
      const res = await axios.post(
        'http://localhost:3000/api/admin/create/badge',
        {
          admin_id: adminInfo.admin_id,
          name,
          description,
          image: imageUrl,
        }
      )
      console.log(res.data)
      setBadges([...badges, res.data])
      alert('Badge created successfully')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateModerator = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    form.reset()

    try {
      await axios.post('http://localhost:3000/api/admin/create/moderator', {
        name,
        email,
        password,
      })
      // console.log(res.data);
      alert('Moderator created successfully')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAssignTask = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const moderator = formData.get('moderator')
    const task = formData.get('task')
    try {
      const res = await axios.post(
        'http://localhost:3000/api/admin/assign/task',
        {
          moderator_id: moderator,
          task_id: task,
        }
      )
      form.reset()
      alert(`${res.data.message}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAssignBadge = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const user = formData.get('user')
    const badge = formData.get('badge')
    try {
      const res = await axios.post(
        'http://localhost:3000/api/admin/assign/badge',
        {
          user_id: user,
          badge_id: badge,
        }
      )
      form.reset()
      // print res message
      alert(`${res.data.message}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <header className='py-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
        </header>

        <main className='pb-8'>
          {/* Stats Section */}
          <div className='mb-8 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-lg bg-white p-6 shadow'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Total Users
              </h2>
              <p className='mt-2 text-3xl font-bold text-blue-600'>
                {stats.totalUsers}
              </p>
              <Link
                to='/admin/users'
                className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Manage Users
              </Link>
            </div>
            <div className='rounded-lg bg-white p-6 shadow'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Total Moderators
              </h2>
              <p className='mt-2 text-3xl font-bold text-blue-600'>
                {stats.totalModerators}
              </p>
              <Link
                to='/admin/moderators'
                className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Manage Moderators
              </Link>
            </div>
          </div>

          {/* Admin Actions Section */}
          <div className='mb-8'>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              Admin Actions
            </h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {/* Create New Moderator */}
              <div className='rounded-lg bg-white p-6 shadow'>
                <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                  Create New Moderator
                </h3>
                <form onSubmit={handleCreateModerator} className='space-y-9'>
                  <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                  <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                  <button
                    type='submit'
                    className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                  >
                    Create Moderator
                  </button>
                </form>
              </div>

              {/* Create New Task */}
              <div className='rounded-lg bg-white p-6 shadow '>
                <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                  Create New Task
                </h3>
                <form onSubmit={handleCreateTask} className='space-y-12'>
                  <input
                    type='text'
                    name='title'
                    placeholder='Article Title'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    required
                  />
                  <textarea
                    name='instruction'
                    placeholder='Instruction'
                    rows={3}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    required
                  />
                  <button
                    type='submit'
                    className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 '
                  >
                    Create Task
                  </button>
                </form>
              </div>

              {/* Create New Badge */}
              <div className='rounded-lg bg-white p-6 shadow'>
                <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                  Create New Badge
                </h3>
                <form onSubmit={handleCreateBadge} className='space-y-8'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Badge Name'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    required
                  />
                  <input
                    type='file'
                    accept='image/*'
                    name='image'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    required
                  />
                  <button
                    type='submit'
                    className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                  >
                    Create Badge
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Assign Task to Moderator */}
          <div className='rounded-lg bg-white p-6 shadow my-5'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
              Assign Task to Moderator
            </h3>
            <form onSubmit={handleAssignTask} className='space-y-4'>
              <select
                name='moderator'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value=''>Select a moderator</option>
                {moderators.map((moderator, index) => (
                  <option key={index} value={`${moderator.moderator_id}`}>
                    {moderator.name}
                  </option>
                ))}
              </select>
              <select
                name='task'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value=''>Select a task</option>
                {tasks.map((task, index) => (
                  <option key={index} value={`${task.task_id}`}>
                    {task.task_title}
                  </option>
                ))}
              </select>
              <button
                type='submit'
                className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              >
                Assign Task
              </button>
            </form>
          </div>

          {/* Provide Badge to User */}
          <div className='rounded-lg bg-white p-6 shadow my-5'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
              Provide Badge to User
            </h3>
            <form onSubmit={handleAssignBadge} className='space-y-4'>
              <select
                name='user'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value=''>Select a user</option>
                {users.map((user, index) => (
                  <option key={index} value={`${user.user_id}`}>
                    {user.fullname}
                  </option>
                ))}
              </select>
              <select
                name='badge'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value=''>Select a badge</option>
                {badges.map((badge, index) => (
                  <option key={index} value={`${badge.badge_id}`}>
                    {badge.badge_desc}
                  </option>
                ))}
              </select>
              <button
                type='submit'
                className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              >
                Assign Badge
              </button>
            </form>
          </div>

          {/* Display Created Tasks and Badges */}
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='rounded-lg bg-white p-6 shadow'>
              <h3 className='mb-6 text-xl font-semibold text-gray-900'>
                Created Tasks
              </h3>
              {tasks.length === 0 ? (
                <div className='text-center py-8'>
                  <div className='text-gray-400 text-5xl mb-4'>📋</div>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No Tasks Created Yet
                  </h3>
                  <p className='text-gray-500'>
                    Create your first task using the form above!
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {tasks.map((task) => (
                    <div
                      key={task.task_id}
                      className='rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow duration-200'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h4 className='text-lg font-medium text-gray-900 mb-2'>
                            {task.task_title}
                          </h4>
                          <p className='text-sm text-gray-600 whitespace-pre-wrap'>
                            {task.task_desc}
                          </p>
                          <div className='mt-3 flex items-center gap-2'>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                task.task_status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : task.task_status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {task.task_status?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='rounded-lg bg-white p-6 shadow'>
              <h3 className='mb-4 text-xl font-semibold text-gray-900'>
                Created Badges
              </h3>
              {badges.length > 0 ? (
                <ul className='flex flex-wrap gap-4'>
                  {badges.map((badge, index) => (
                    <li
                      key={index}
                      className='p-4 bg-gray-400 rounded-lg flex flex-col items-center justify-center'
                    >
                      <h4 className='text-lg font-medium text-gray-900'>
                        {badge.badge_desc}
                      </h4>
                      <img
                        src={badge.badge_url}
                        alt={badge.badge_desc}
                        className='mt-2 w-20 h-20 object-cover rounded-lg'
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-500'>No badges created yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
