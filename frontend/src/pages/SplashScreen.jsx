import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/auth/signin')
  }

  return (
    <div className='flex h-screen items-center justify-center bg-white'>
      <div className='text-center'>
        <h1 className='mb-6 text-4xl font-bold text-gray-800'>Welcome!</h1>
        <p className='mb-8 text-lg text-gray-600'>
          Start your journey with us today.
        </p>
        <button
          onClick={handleGetStarted}
          className='rounded-md bg-green-500 px-6 py-3 text-white hover:bg-green-600'
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
