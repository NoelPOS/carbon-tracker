import { useState } from 'react'

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
        {filteredArticles.map((article) => (
          <div key={article.id} className='rounded-lg bg-white p-6 shadow-sm'>
            <div className='flex gap-6'>
              <img
                src={article.image}
                alt=''
                className='h-32 w-32 rounded-lg object-cover'
              />
              <div className='flex-grow'>
                <div className='flex items-center gap-2'>
                  <img
                    src={article.image}
                    alt=''
                    className='h-6 w-6 rounded-full'
                  />
                  <span className='text-sm text-gray-600'>
                    Moderator - {article.name}
                  </span>
                </div>
                <h3 className='mt-2 text-lg font-semibold'>{article.title}</h3>
                <p className='text-gray-600'>{article.subtitle}</p>
                <div className='mt-4 flex gap-2'>
                  <button className='rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600'>
                    Approve
                  </button>
                  <button className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
