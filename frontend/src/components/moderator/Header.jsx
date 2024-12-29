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
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link to='/moderator' className='flex items-center'>
          <span className='text-xl font-semibold'>🌱 Carbon Tracker</span>
        </Link>
        <nav className='flex items-center space-x-4'>
          <Link
            to='/moderator'
            className={`rounded-md px-3 py-2 text-sm ${isActive('/moderator')}`}
          >
            Home
          </Link>
          <Link
            to='/moderator/articles'
            className={`rounded-md px-3 py-2 text-sm ${isActive(
              '/moderator/articles'
            )}`}
          >
            My Articles
          </Link>
          <Link
            to='/moderator/profile'
            className={`rounded-md px-3 py-2 text-sm ${isActive(
              '/moderator/profile'
            )}`}
          >
            Profile
          </Link>
          <button className='rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100'>
            Log out
          </button>
        </nav>
      </div>
    </header>
  )
}
