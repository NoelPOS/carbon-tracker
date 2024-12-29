export default function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='flex justify-between text-sm text-gray-500'>
          <p>© 2024 Carbon Tracker. All rights reserved.</p>
          <div className='space-x-4'>
            <a href='#' className='hover:text-gray-900'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-gray-900'>
              Terms of Service
            </a>
            <a href='#' className='hover:text-gray-900'>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
