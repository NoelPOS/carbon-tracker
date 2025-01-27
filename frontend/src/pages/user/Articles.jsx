import { useState } from 'react'
import { Link } from 'react-router-dom'

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

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <input
          type='text'
          placeholder='Enter Article Name'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className='overflow-hidden rounded-lg bg-white shadow-sm'
          >
            <img
              src={article.image}
              alt=''
              className='h-48 w-full object-cover'
            />
            <div className='p-4'>
              <h3 className='font-semibold'>{article.title}</h3>
              <p className='mt-1 text-sm text-gray-600'>
                {article.description}
              </p>
              <Link
                to={`/user/articles/${article.id}`}
                className='mt-4 inline-block rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
              >
                DETAIL
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
