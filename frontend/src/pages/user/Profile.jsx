import { useState, useEffect } from 'react'
import axios from 'axios'

// -- Badge Table
// CREATE TABLE Badge (
//     badge_id SERIAL PRIMARY KEY,
//     badge_url VARCHAR(255),
//     badge_desc TEXT,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Reward Table (Links Badges to Users)
// CREATE TABLE Reward (
//     badge_id INT REFERENCES Badge(badge_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (badge_id, user_id)
// );

// -- Users Table
// CREATE TABLE Users (
//     user_id SERIAL PRIMARY KEY,
//     fullname VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     address VARCHAR(255),
//     phone_number VARCHAR(20),
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
//     streak_day INT DEFAULT 0,
//     last_survey DATE
// );

export default function Profile() {
  const [profileData, setProfileData] = useState({
    userid: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    accountCreated: '',
  })
  const [badges, setBadges] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('users'))
    console.log('User:', user)

    if (user) {
      setProfileData({
        userid: user.user_id,
        name: user.fullname,
        email: user.email,
        password: user.password,
        phone: user.phone_number,
        address: user.address,
      })
    }

    const fetchBadges = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/badge/${user.user_id}`
        )
        console.log('Badges:', res.data)
        setBadges(res.data)
      } catch (err) {
        console.error('Error fetching badges:', err)
      }
    }
    fetchBadges()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/update/${profileData.userid}`,
        profileData
      )
      console.log(res.data)

      localStorage.setItem('user')

      alert('Profile updated successfully')
    } catch {
      console.log('Error updating profile')
    }
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Profile Information */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Profile Information</h2>
          <div className='mt-4 flex items-center space-x-6'>
            <img
              src={`https://avatar.iran.liara.run/username?username=${profileData.name}`}
              alt='Profile'
              className='h-25 w-25 rounded-lg object-cover'
            />
            <div className='flex-1 space-y-6'>
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
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <input
                  type='text'
                  id='password'
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-semibold'>Additional Information</h2>
          <div className='mt-4 space-y-4'>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Phone Number
              </label>
              <input
                type='text'
                id='phone'
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700'
              >
                Location
              </label>
              <input
                type='text'
                id='location'
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          Save Changes
        </button>
      </form>

      {/* Badges */}
      <div className='mt-8 rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold'>Badges</h2>
        <div className='mt-6 grid gap-6 sm:grid-cols-3'>
          {badges.length === 0 ? (
            <p className='text-center text-gray-500'>No badges earned yet</p>
          ) : (
            badges.map((badge) => (
              <div
                key={badge.title}
                className='flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center'
              >
                <img
                  src={badge.badge_url}
                  alt={badge.badge}
                  className='h-16 w-16 object-cover'
                />
                <h3 className='mt-2 font-medium'>{badge.badge_desc}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
