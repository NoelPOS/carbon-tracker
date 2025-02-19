import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ModeratorArticles() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const moderator_id = JSON.parse(
      localStorage.getItem('moderator')
    ).moderator_id
    const fetchArticles = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/moderator/articles/${moderator_id}`
      )
      setArticles(res.data)
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (article_id) => {
    const res = await axios.delete(
      `http://localhost:3000/api/moderator/article/${article_id}`
    )
    console.log(res.data)
    alert('Article deleted successfully')
    window.location.reload()
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Enter Article Name'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='space-y-4'>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='flex gap-6'>
                <img
                  src={article.img_url}
                  alt=''
                  className='h-24 w-24 rounded-lg object-cover'
                />
                <div className='flex flex-col flex-grow'>
                  <h3 className='font-semibold'>{article.title}</h3>
                  <p className='text-sm text-gray-600'>{article.subtitle}</p>
                  <div className='mt-auto flex gap-2'>
                    <Link
                      to={`/moderator/articles/${article.article_id}/edit`}
                      className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(article.article_id)}
                      className='rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600'
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='rounded-lg bg-white p-12 shadow-sm text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
            <h3 className='mt-2 text-lg font-medium text-gray-900'>
              No articles created yet
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Admin will assign articles to you soon
            </p>
          </div>
        )}

        {/* {filteredArticles.map((article) => (
          <div
            key={article.id}
            className='flex gap-4 rounded-lg bg-white p-4 shadow-sm'
          >
            <img
              src={article.img_url}
              alt=''
              className='h-24 w-24 rounded-lg object-cover'
            />
            <div className='flex flex-grow flex-col'>
              <h3 className='font-semibold'>{article.title}</h3>
              <p className='text-sm text-gray-600'>{article.subtitle}</p>
              <div className='mt-auto flex gap-2'>
                <Link
                  to={`/moderator/articles/${article.article_id}/edit`}
                  className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
                >
                  UPDATE
                </Link>
                <button
                  onClick={() => handleDelete(article.article_id)}
                  className='rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600'
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}
