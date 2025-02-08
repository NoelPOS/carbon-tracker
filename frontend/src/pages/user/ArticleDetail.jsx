import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ArticleDetail() {
  const [article, setArticle] = useState([])
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])
  const [replyContent, setReplyContent] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/articles/${id}`
        )
        console.log('Article:', res.data)
        setArticle(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/articles/${id}/comment`
        )
        console.log('Comments:', res.data)

        setComments(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchComments()
    fetchArticle()
  }, [])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const content = formData.get('comment')

    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/articles/${id}/comment`,
        {
          user_id: JSON.parse(localStorage.getItem('users')).user_id,
          content,
        }
      )
      console.log(res.data)
      setComments((prev) => [...prev, res.data])
    } catch (err) {
      console.error(err)
    }
  }

  const handleReply = async (commentId) => {
    setReplyContent((prev) => ({ ...prev, [commentId]: '' }))
    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/articles/${id}/comment/${commentId}/reply`,
        {
          user_id: JSON.parse(localStorage.getItem('users')).user_id,
          content: replyContent[commentId],
        }
      )
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return article ? (
    <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
      <article className='prose prose-lg mx-auto'>
        <h1 className='text-center text-4xl font-bold'>{article.title}</h1>
        <p className='text-center text-gray-600'>{article.subtitle}</p>

        <img
          src={article.img_url}
          alt={article.title}
          className='my-8 w-full rounded-lg object-cover'
        />

        <p className='text-gray-800'>{article.content}</p>
      </article>

      <div className='mt-12'>
        <h2 className='text-xl font-semibold'>Comments</h2>

        <form onSubmit={handleSubmitComment} className='mt-4'>
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='What are your thoughts?'
              name='comment'
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

        <div className='mt-8 space-y-6'>
          {comments.map((comment) => (
            <div key={comment.comment_id} className='flex gap-4'>
              <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-200' />
              <div className='flex-grow'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{comment.user_id}</span>
                  <span className='text-sm text-gray-500'>
                    {comment.timestamp}
                  </span>
                </div>
                <p className='mt-1 text-gray-800'>{comment.content}</p>
                <button
                  onClick={() =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [comment.comment_id]: prev[comment.comment_id] ? '' : '',
                    }))
                  }
                  className='mt-1 text-sm text-gray-500 hover:text-gray-700'
                >
                  Reply
                </button>

                {replyContent[comment.comment_id] !== undefined && (
                  <div className='mt-2 flex gap-2'>
                    <input
                      type='text'
                      placeholder='Write a reply...'
                      name='reply'
                      value={replyContent[comment.comment_id] || ''}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [comment.comment_id]: e.target.value,
                        }))
                      }
                      className='flex-grow rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    />
                    <button
                      onClick={() => handleReply(comment.comment_id)}
                      className='rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600'
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}
