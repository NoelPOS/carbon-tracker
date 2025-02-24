import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../../components/ui/AssignModal'

export default function Moderators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tasks, setTasks] = useState([])
  const [moderatorList, setModeratorList] = useState([])
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedModerator, setSelectedModerator] = useState(null)
  const [selectedTask, setSelectedTask] = useState('')

  useEffect(() => {
    try {
      const fetchModerators = async () => {
        const res = await axios.get(
          'http://localhost:3000/api/admin/moderators'
        )
        setModeratorList(res.data)
      }

      const fetchTasks = async () => {
        const res = await axios.get('http://localhost:3000/api/admin/tasks')
        console.log('tasks', res.data)
        setTasks(res.data)
      }

      fetchTasks()
      fetchModerators()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleSuspend = async (id) => {
    if (confirm('Are you sure you want to suspend this moderator?')) {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/admin/update/moderator`,
          {
            moderator_id: id,
            status: 'suspended',
            admin_id: JSON.parse(localStorage.getItem('admin')).admin_id,
          }
        )

        if (res.status === 200) {
          alert('Moderator suspended successfully')
          window.location.reload()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this moderator?')) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/admin/delete/moderator/${id}`
        )

        if (res.status === 200) {
          alert('Moderator deleted successfully')
          window.location.reload()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleAssign = (moderator) => {
    setSelectedModerator(moderator)
    setIsAssignModalOpen(true)
  }

  const handleSubmitAssignment = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const task_id = formData.get('task')
    try {
      const res = await axios.post(
        `http://localhost:3000/api/admin/assign/task`,
        {
          moderator_id: selectedModerator.moderator_id,
          task_id,
        }
      )

      if (res.status === 200) {
        alert('Task assigned successfully')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/moderators?search=${searchQuery}`
      )

      setModeratorList(res.data)
      setSearchQuery('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-2xl font-bold'>Manage Moderators</h1>

      <div className='mb-6'>
        <form
          className='flex items-center justify-between'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Enter Article Name'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type='submit'
            className='ml-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600'
          >
            Search
          </button>
        </form>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {moderatorList.map((moderator) => (
          <div key={moderator.id} className='rounded-lg bg-white p-6 shadow-sm'>
            <img
              src={`https://avatar.iran.liara.run/username?username=${moderator.name}`}
              alt={moderator.name}
              className='h-16 w-16 rounded-full object-cover mb-4 '
            />
            <h3 className='font-semibold'>Name: {moderator.name}</h3>
            <p className='text-sm text-gray-600'>{moderator.email}</p>
            <p className='mt-1 text-sm text-gray-500'>
              Status: {moderator.status}
            </p>

            <div className='mt-4 flex gap-2'>
              <button
                onClick={() => handleAssign(moderator)}
                className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Assign Task
              </button>
              <button
                onClick={() => handleSuspend(moderator.moderator_id)}
                className='rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600'
              >
                Suspend
              </button>
              <button
                onClick={() => handleDelete(moderator.moderator_id)}
                className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title='Assign Task to Moderator'
      >
        <form onSubmit={handleSubmitAssignment} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Selected Moderator
            </label>
            <input
              type='text'
              value={selectedModerator?.name || ''}
              disabled
              className='mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Select Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              name='task'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              required
            >
              <option value=''>Select a task</option>
              {tasks.map((task) => (
                <option key={task.task_id} value={task.task_id}>
                  {task.task_title}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          >
            Assign
          </button>
        </form>
      </Modal>
    </div>
  )
}
