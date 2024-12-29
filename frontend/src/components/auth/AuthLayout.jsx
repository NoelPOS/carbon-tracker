import { Link } from 'react-router-dom'
import Footer from '../Footer'

export default function AuthLayout({ children }) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <div className='flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md'>
          <div className='mb-6 flex justify-center'>
            <Link to='/' className='flex items-center'>
              <span className='text-xl font-semibold'>🌱 Carbon Tracker</span>
            </Link>
          </div>
          <div className='rounded-lg bg-white px-8 py-10 shadow'>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
