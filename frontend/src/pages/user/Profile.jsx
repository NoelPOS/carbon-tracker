import { useState } from 'react'

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+123 456 789',
    location: 'Samut Prakan, Thailand',
    accountCreated: 'January 15, 2024',
  })

  const badges = [
    {
      title: 'Eco Warrior',
      description: 'For reducing 10kg CO2 this week',
      icon: '🌱',
    },
    {
      title: 'Carbon Saver',
      description: 'For saving 20kg CO2 this month',
      icon: '🌍',
    },
    {
      title: 'Green Innovator',
      description: 'For innovative eco-friendly solutions',
      icon: '🌿',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle profile update
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='space-y-8'>
        {/* Profile Information */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Profile Information</h2>
          <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
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

        {/* Additional Information */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Additional Information</h2>
            <button className='rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200'>
              Edit
            </button>
          </div>
          <div className='mt-4 space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Phone Number:</span>
              <span>{profileData.phone}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Account Created:</span>
              <span>{profileData.accountCreated}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Location:</span>
              <span>{profileData.location}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Badges</h2>
          <div className='mt-6 grid gap-6 sm:grid-cols-3'>
            {badges.map((badge) => (
              <div
                key={badge.title}
                className='flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center'
              >
                <span className='text-3xl'>{badge.icon}</span>
                <h3 className='mt-2 font-medium'>{badge.title}</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
