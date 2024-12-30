import { Link } from 'react-router-dom'
import apple from '../../assets/apple.png'

const leaderboardData = [
  { name: 'Alex Green', avg: '12.5 kg', streak: '15 days' },
  { name: 'Jamie Blue', avg: '13.2 kg', streak: '12 days' },
  { name: 'Sam Brown', avg: '14.0 kg', streak: '7 days' },
]

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

export default function Home() {
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
        <div className='space-y-4'>
          {leaderboardData.map((user, index) => (
            <div key={user.name} className='flex items-center justify-between'>
              <div>
                <span className='mr-2'>{index + 1}.</span>
                <span>{user.name}</span>
              </div>
              <div className='flex items-center space-x-8'>
                <span className='text-gray-600'>Avg: {user.avg}</span>
                <span className='text-gray-600'>Streak: {user.streak}</span>
              </div>
            </div>
          ))}
        </div>
        <Link
          to='/leaderboard'
          className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          SEE MORE
        </Link>
      </div>

      {/* Articles Section */}
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold'>Articles</h2>
        <div className='space-y-4'>
          {articles.map((article) => (
            <div key={article.title} className='flex gap-4'>
              <img
                src={article.image}
                alt=''
                className='h-24 w-24 rounded-lg object-cover'
              />
              <div>
                <h3 className='font-semibold'>{article.title}</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          to='/articles'
          className='mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          SEE MORE ARTICLES
        </Link>
      </div>
    </div>
  )
}
