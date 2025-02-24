import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function EditArticle() {
  const { article_id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    console.log(article_id)
    const moderator_id = JSON.parse(
      localStorage.getItem('moderator')
    ).moderator_id
    // Fetch article data
    const fetchArticle = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/moderator/article/${article_id}`
      )
      // console.log(res.data)

      setArticle(res.data)
    }
    fetchArticle()
  }, [])

  const handleRemoveComment = async (commentId) => {
    const moderator_id = JSON.parse(
      localStorage.getItem('moderator')
    ).moderator_id
    const res = await axios.delete(
      `http://localhost:3000/api/moderator/${moderator_id}/comment/${commentId}`
    )
    console.log(res.data)
    alert('Comment deleted successfully')
    window.location.reload()
  }

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const imageUrl = await uploadImageToCloudinary(file)
    if (imageUrl) {
      setArticle({ ...article, img_url: imageUrl })
    }
  }

  const handleUpdateArticle = async () => {
    const moderator_id = JSON.parse(
      localStorage.getItem('moderator')
    ).moderator_id
    console.log(article)
    await axios.put(
      `http://localhost:3000/api/moderator/article/${article_id}`,
      { ...article, moderator_id }
    )
    navigate('/moderator/articles')
  }

  const handleDeleteArticle = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/moderator/article/${article_id}`
    )
    console.log(res.data)
    navigate('/moderator/articles')
  }

  if (!article) return null

  return (
    <div className='mx-auto max-w-2xl space-y-8 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Update Article</h1>
        <div className='flex gap-2'>
          <button
            onClick={handleUpdateArticle}
            className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          >
            Update
          </button>
          <button
            onClick={() => navigate('/moderator/articles')}
            className='rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'
          >
            Cancel
          </button>
        </div>
      </div>

      <form className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Sub Title
          </label>
          <input
            type='text'
            value={article.subtitle}
            onChange={(e) =>
              setArticle({ ...article, subtitle: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            value={article.description}
            onChange={(e) =>
              setArticle({ ...article, description: e.target.value })
            }
            rows={6}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <div className='mt-1'>
            <img
              src={article.img_url}
              alt=''
              className='h-48 w-full rounded-lg object-cover'
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='mt-2 block w-full text-sm text-gray-500'
            />
          </div>
        </div>
      </form>

      {/* Comments Section */}
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-lg font-semibold'>
          Comments ({article.comments.length})
        </h2>
        <div className='space-y-4'>
          {article.comments.map((comment) => (
            <div
              key={comment.comment_id}
              className='flex items-start justify-between'
            >
              <div className='flex gap-3'>
                <img
                  src={`https://avatar.iran.liara.run/username?username=${comment.user_name}`}
                  alt='Profile'
                  className='h-10 w-10 rounded-lg object-cover'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>{comment.user_name}</span>
                    <span className='text-sm text-gray-500'>
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className='text-gray-600'>{comment.content}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveComment(comment.comment_id)}
                className='rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
