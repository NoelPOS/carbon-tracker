import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

// -- Moderator Table
// CREATE TABLE Moderator (
//     moderator_id SERIAL PRIMARY KEY,
// 	name VARCHAR(255),
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active'
// );

// -- Article Table
// CREATE TABLE Article (
//     article_id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     subtitle VARCHAR(255),
//     description TEXT NOT NULL,
//     img_url VARCHAR(255),
//     status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
//     moderator_id INT REFERENCES Moderator(moderator_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

export default function CreateArticle() {
  // get id from url params
  const { id } = useParams()
  console.log('Task Id:', id)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null,
  })

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'carbon_tracker')
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dlprlndi6/image/upload`,
        formData
      )
      console.log(res.data.secure_url)
      return res.data.secure_url
    } catch (err) {
      console.log('Image upload error:', err)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title')
    const subtitle = formData.get('subtitle')
    const description = formData.get('description')
    const moderator_id = JSON.parse(
      localStorage.getItem('moderator')
    ).moderator_id
    const image = formData.get('image')
    const image_url = await uploadImageToCloudinary(image)

    try {
      const res = await axios.post(
        'http://localhost:3000/api/moderator/article/create',
        {
          title,
          subtitle,
          description,
          img_url: image_url,
          moderator_id,
          task_id: id,
        }
      )
      if (res.status === 201) {
        alert('Article submitted successfully')
        navigate('/moderator/articles')
      } else {
        alert('An error occurred during article submission')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred during article submission')
    }
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='mb-6 text-2xl font-bold'>Create a new article</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            placeholder='Enter the title here'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Sub Title
          </label>
          <input
            type='text'
            name='subtitle'
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            placeholder='Enter the sub title here'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            value={formData.description}
            name='description'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            placeholder='Enter the description here'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
            <div className='space-y-1 text-center'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <div className='flex text-sm text-gray-600'>
                <label
                  htmlFor='file-upload'
                  className='relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500'
                >
                  <span>Upload a file</span>
                  <input
                    id='file-upload'
                    name='image'
                    type='file'
                    className='sr-only'
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setFormData({ ...formData, image: file })
                    }}
                  />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt=''
                  className='h-24 w-24 object-cover mx-auto mt-4 rounded-lg'
                />
              )}
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        >
          Submit to Admin
        </button>
      </form>
    </div>
  )
}
