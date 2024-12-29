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

export default function ModeratorArticles() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
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
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className='flex gap-4 rounded-lg bg-white p-4 shadow-sm'
          >
            <img
              src={article.image}
              alt=''
              className='h-24 w-24 rounded-lg object-cover'
            />
            <div className='flex flex-grow flex-col'>
              <h3 className='font-semibold'>{article.title}</h3>
              <p className='text-sm text-gray-600'>{article.subtitle}</p>
              <div className='mt-auto flex gap-2'>
                <Link
                  to={`/moderator/articles/${article.id}/edit`}
                  className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'
                >
                  UPDATE
                </Link>
                <button className='rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600'>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
