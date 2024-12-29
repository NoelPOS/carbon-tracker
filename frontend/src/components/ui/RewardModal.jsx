export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-50' onClick={onClose} />
      <div className='relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500'
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
