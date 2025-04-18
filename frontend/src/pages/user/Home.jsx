import { Link } from 'react-router-dom'
import apple from '../../assets/apple.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [leaderboardData, setLeaderboardData] = useState([])
  useEffect(() => {
    const checkStatus = async () => {
      const last_survey = JSON.parse(localStorage.getItem('users')).last_survey
      const today = new Date()
      const diffTime = Math.abs(today - new Date(last_survey))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 1) {
        try {
          await axios.put(`http://localhost:3000/api/users/streak`, {
            user_id: JSON.parse(localStorage.getItem('users')).user_id,
          })
          const user = JSON.parse(localStorage.getItem('users'))
          user.streak_day = 0
          localStorage.setItem('users', JSON.stringify(user))
        } catch (err) {
          console.error('Error resetting streak:', err)
        }
      }
    }
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/articles`)
        console.log('Articles:', res.data)
        setArticles(res.data)
      } catch (err) {
        console.error('Error fetching articles:', err)
        onsole.error('Error fetching articles:', err)
      }
    }

    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/leaderboard/name`
        )
        console.log('Leaderboard by name:', res.data)
        setLeaderboardData(res.data)
      } catch (err) {
        console.error('Error fetching leaderboard:', err)
      }
    }
    checkStatus()
    fetchLeaderboard()
    fetchArticles()
  }, [])
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Welcome Section */}
      <div className='mb-8 flex items-start justify-between rounded-lg bg-white p-6 shadow-sm'>
        <div>
          <h1 className='text-2xl font-bold'>Welcome back!</h1>
          <p className='mt-2 text-gray-600'>
            Have you taken your daily survey?
          </p>
          <Link
            to='/user/survey'
            className='mt-4 inline-block rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
          >
            TAKE SURVEY
          </Link>
        </div>
        <img src={apple} alt='' className='h-32 w-auto' />
      </div>

      {/* Leaderboard Section */}
      <div className='mb-8 rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold'>Leaderboard</h2>
        {leaderboardData.length === 0 ? (
          <div className='text-center py-8'>
            <div className='text-gray-400 text-5xl mb-4'>🏆</div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Rankings Yet
            </h3>
            <p className='text-gray-500 mb-4'>
              Take your first survey to appear on the leaderboard!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {leaderboardData.map((user, index) => (
              <div
                key={user.fullname}
                className='flex items-center justify-between'
              >
                <div>
                  <span className='mr-2'>{index + 1}.</span>
                  <span>{user.fullname}</span>
                </div>
                <div className='flex items-center space-x-8'>
                  <span className='text-gray-600'>
                    Avg: {user.avg.slice(0, 6)}
                  </span>
                  <span className='text-gray-600'>Streak:{user.streak}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to='/user/leaderboard'
          className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          SEE MORE
        </Link>
      </div>

      {/* Articles Section */}
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold'>Articles</h2>
        {articles.length === 0 ? (
          <div className='text-center py-8'>
            <div className='text-gray-400 text-5xl mb-4'>📚</div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Articles Yet
            </h3>
            <p className='text-gray-500 mb-4'>
              Check back soon for interesting environmental articles!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {articles.map((article) => (
              <div key={article.article_id} className='flex gap-4'>
                <Link
                  to={`/user/articles/${article.article_id}`}
                  className='flex items-center gap-4'
                >
                  <img
                    src={article.img_url}
                    alt=''
                    className='h-24 w-24 rounded-lg object-cover'
                  />
                  <div>
                    <h3 className='font-semibold'>{article.title}</h3>
                    <p className='text-gray-600'>
                      {article.description.slice(0, 20)}...
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <Link
          to='/user/articles'
          className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          SEE MORE ARTICLES
        </Link>
      </div>
    </div>
  )
}
