import { Link } from 'react-router-dom'

const tasks = [
  {
    id: '1',
    title: 'How Renewable Energy is Changing the World',
    description:
      'Write about how renewable energy is changing the world. Do your research and give insights to your user. Finish it by today.',
    status: 'pending',
  },
]

export default function ModeratorHome() {
  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold'>Tasks</h1>
      <div className='space-y-4'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='flex items-center justify-between rounded-lg bg-white p-6 shadow-sm'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex h-14 w-16 items-center justify-center rounded-md bg-gray-500 text-white'>
                TASK {task.id}
              </div>
              <div>
                <h3 className='font-semibold'>{task.title}</h3>
                <p className='text-sm text-gray-600'>{task.description}</p>
              </div>
            </div>
            <Link
              to={`/moderator/articles/create`}
              className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
            >
              Do it now
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
