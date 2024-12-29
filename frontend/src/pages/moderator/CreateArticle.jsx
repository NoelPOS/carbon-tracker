import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateArticle() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    navigate('/moderator/articles')
  }

  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold'>Create a new article</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
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
                    name='file-upload'
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
