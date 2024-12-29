import Header from './Header'
import Footer from '../Footer'

export default function UserLayout({ children }) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header />
      <main className='mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
      <Footer className='mt-auto' />
    </div>
  )
}
