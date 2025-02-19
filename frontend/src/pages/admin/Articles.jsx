import { useState, useEffect } from 'react'
import axios from 'axios'

// const articlesData = [
//   {
//     id: 1,
//     name: "John Doe",
//     title: "How Renewable Energy is Changing the World",
//     subtitle:
//       "Discover the latest trends in renewable energy and how they are shaping our future.",
//     image:
//       "https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg",
//     content:
//       "Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands.",
//     comments: [
//       {
//         id: 1,
//         author: "John Doe",
//         content: "Great article! I really enjoyed reading this.",
//         timestamp: "about 2 hours ago",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     title: "Carbon Offsetting: A Comprehensive Guide",
//     subtitle:
//       "Learn how carbon offsetting works and how you can contribute to reducing emissions.",
//     image:
//       "https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg",
//     content:
//       "Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands.",
//     comments: [
//       {
//         id: 1,
//         author: "John Doe",
//         content: "Great article! I really enjoyed reading this.",
//         timestamp: "about 2 hours ago",
//       },
//     ],
//   },
// ];

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/admin/articles`)
        console.log('Articles:', res.data)
        setArticles(res.data)
      } catch (err) {
        console.error('Error fetching articles:', err)
      }
    }
    fetchArticles()
  }, [])

  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/admin/article/${id}`,
        { action }
      )
      console.log(res.data)
      window.location.reload()
      alert(`Article has been ${action}.`)
    } catch (err) {
      console.error('Error updating article:', err)
    }
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-2xl font-bold'>Articles Management</h1>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Enter Article Name'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='space-y-6'>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='flex gap-6'>
                <img
                  src={article.img_url}
                  alt=''
                  className='h-32 w-32 rounded-lg object-cover'
                />
                <div className='flex-grow'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600'>
                      Moderator - {article.moderator_id}
                    </span>
                  </div>
                  <h3 className='mt-2 text-lg font-semibold'>
                    {article.title}
                  </h3>
                  <p className='text-gray-600'>{article.subtitle}</p>
                  <div className='mt-4 flex gap-2'>
                    <button
                      className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
                      onClick={() =>
                        handleAction(article.article_id, 'approved')
                      }
                    >
                      Approve
                    </button>
                    <button
                      className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
                      onClick={() => handleAction(article.id, 'rejected')}
                    >
                      Reject
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
              No articles submitted yet
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Articles submitted by moderators will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
