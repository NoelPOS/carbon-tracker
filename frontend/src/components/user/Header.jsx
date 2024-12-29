import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-600 hover:bg-gray-50'
  }

  return (
    <header className='border-b border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/user' className='flex items-center'>
              <span className='text-xl font-semibold'>🌱 Carbon Tracker</span>
            </Link>
          </div>
          <nav className='flex items-center space-x-2'>
            <Link
              to='/user'
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(
                '/user'
              )}`}
            >
              Home
            </Link>
            <Link
              to='/user/survey'
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(
                '/user/survey'
              )}`}
            >
              Survey
            </Link>
            <Link
              to='/user/articles'
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(
                '/userarticles'
              )}`}
            >
              Articles
            </Link>
            <Link
              to='/user/leaderboard'
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(
                '/user/leaderboard'
              )}`}
            >
              Leaderboard
            </Link>
            <Link
              to='/user/profile'
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(
                '/user/profile'
              )}`}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
