import Header from './Header'
import Footer from '../Footer'

export default function AdminLayout({ children }) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header />
      <main className=' flex-1 px-4 py-8 sm:px-6 lg:px-8'>{children}</main>
      <Footer className='mt-auto' />
    </div>
  )
}
