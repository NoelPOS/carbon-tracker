import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import { validateEmail, validatePassword } from '../../utils/auth'
import axios from 'axios'

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    navigate('/user')

    // if (!validateEmail(formData.email)) {
    //   setError("Please enter a valid email address");
    //   return;
    // }

    // if (!validatePassword(formData.password)) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    try {
      const res = await axios.post('http://localhost:3000/api/users/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
      })
      if (res.status === 201) {
        localStorage.setItem('users', JSON.stringify(res.data))
        navigate('/user')
      } else {
        setError('An error occurred during sign up')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred during sign up')
    }
  }

  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div>
          <h2 className='text-center text-2xl font-bold'>Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              id='fullName'
              type='text'
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <div>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'
            >
              Address
            </label>
            <input
              id='address'
              type='text'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Phone Number
            </label>
            <input
              id='phone'
              type='tel'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/auth/signin'
            className='font-medium text-green-600 hover:text-green-500'
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
