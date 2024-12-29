import Header from './Header'

export default function UserLayout({ children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  )
}
