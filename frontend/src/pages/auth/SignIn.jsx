import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import RoleSelector from '../../components/auth/RoleSelector'
import { ROLE_ROUTES, validateEmail } from '../../utils/auth'

export default function SignIn() {
  const navigate = useNavigate()
  const [role, setRole] = useState('user')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      // Api call
      navigate(ROLE_ROUTES[role])
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div>
          <h2 className='text-center text-2xl font-bold'>Sign In</h2>
        </div>

        <RoleSelector
          selectedRole={role}
          onRoleChange={setRole}
          showAllRoles={true}
        />

        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <input
              id='email'
              type='email'
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Login
          </button>
        </form>

        {role === 'user' && (
          <p className='text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link
              to='/auth/signup'
              className='font-medium text-green-600 hover:text-green-500'
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </AuthLayout>
  )
}
