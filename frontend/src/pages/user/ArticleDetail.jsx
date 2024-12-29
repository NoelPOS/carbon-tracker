import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ArticleDetail() {
  const articles = [
    {
      id: 1,
      title: 'How Renewable Energy is Changing the World',
      subtitle:
        'Discover the latest trends in renewable energy and how they are shaping our future.',
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg',
      content:
        'Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands. The industry has seen exponential growth, driven by technological advancements and increasing awareness of the environmental impact of fossil fuels. As we embrace solar, wind, and other renewable sources, we are paving the way for a cleaner, greener future. This shift is not only reducing carbon emissions but also creating jobs, fostering innovation, and driving economic growth. Join us as we explore the impact of renewable energy and its role in shaping a sustainable world for generations to come.',
      comments: [
        {
          id: 1,
          author: 'John Doe',
          content: 'Great article! I really enjoyed reading this.',
          timestamp: 'about 2 hours ago',
        },
      ],
    },
    {
      id: 2,
      title: 'Carbon Offsetting: A Comprehensive Guide',
      subtitle:
        'Learn how carbon offsetting works and how you can contribute to reducing emissions.',
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg',
      content:
        'Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands. The industry has seen exponential growth, driven by technological advancements and increasing awareness of the environmental impact of fossil fuels. As we embrace solar, wind, and other renewable sources, we are paving the way for a cleaner, greener future. This shift is not only reducing carbon emissions but also creating jobs, fostering innovation, and driving economic growth. Join us as we explore the impact of renewable energy and its role in shaping a sustainable world for generations to come.',
      comments: [
        {
          id: 1,
          author: 'John Doe',
          content: 'Great article! I really enjoyed reading this.',
          timestamp: 'about 2 hours ago',
        },
      ],
    },
  ]

  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find((a) => a.id === Number(id))
  const [newComment, setNewComment] = useState('')

  if (!article) {
    navigate('/articles')
    return null
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: article.comments.length + 1,
      author: 'Current User', // This would come from auth context in a real app
      content: newComment,
      timestamp: 'just now',
    }

    article.comments.push(comment)
    setNewComment('')
  }

  return (
    <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
      <article className='prose prose-lg mx-auto'>
        <h1 className='text-center text-4xl font-bold'>{article.title}</h1>
        <p className='text-center text-gray-600'>{article.subtitle}</p>

        <img
          src={article.image}
          alt={article.title}
          className='my-8 w-full rounded-lg object-cover'
        />

        <p className='text-gray-800'>{article.content}</p>
      </article>

      {/* Comments Section */}
      <div className='mt-12'>
        <h2 className='text-xl font-semibold'>
          Comments ({article.comments.length})
        </h2>

        {/* New Comment Form */}
        <form onSubmit={handleSubmitComment} className='mt-4'>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='What are your thoughts?'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className='flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200'
            >
              Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className='mt-8 space-y-6'>
          {article.comments.map((comment) => (
            <div key={comment.id} className='flex gap-4'>
              <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-200' />
              <div className='flex-grow'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{comment.author}</span>
                  <span className='text-sm text-gray-500'>
                    {comment.timestamp}
                  </span>
                </div>
                <p className='mt-1 text-gray-800'>{comment.content}</p>
                <button className='mt-1 text-sm text-gray-500 hover:text-gray-700'>
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
