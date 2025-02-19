import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ModeratorProfile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const moderator = JSON.parse(localStorage.getItem('moderator'))
    setProfileData({
      name: moderator.name,
      email: moderator.email,
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const moderator = JSON.parse(localStorage.getItem('moderator'))
      axios
        .put(
          `http://localhost:3000/api/moderator/profile/update/${moderator.moderator_id}`,
          profileData
        )
        .then((res) => {
          localStorage.setItem('moderator', JSON.stringify(res.data))
          alert('Profile updated successfully')
          window.location.reload()
        })
        .catch((err) => {
          console.error('Error updating profile:', err)
          alert('An error occurred. Please try again.')
        })
    } catch (err) {
      console.error('Error in userUpdate:', err)
    }
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='space-y-8'>
        {/* Profile Information */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Profile Information</h2>
          <div className='mt-4 flex items-center space-x-6'>
            <form onSubmit={handleSubmit} className='flex-1 space-y-6'>
              <img
                src={`https://avatar.iran.liara.run/username?username=${profileData.name}`}
                alt='Profile'
                className='h-25 w-25 rounded-lg object-cover mx-auto'
              />
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              <button
                type='submit'
                className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
      </div>
    </div>
  )
}
