export default function RoleSelector({
  selectedRole,
  onRoleChange,
  showAllRoles = false,
}) {
  return (
    <div className='mb-6'>
      <label className='mb-2 block text-sm font-medium text-gray-700'>
        Select Role
      </label>
      <div className='grid grid-cols-3 gap-2'>
        <button
          type='button'
          onClick={() => onRoleChange('user')}
          className={`rounded-md px-3 py-2 text-sm ${
            selectedRole === 'user'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          User
        </button>
        <button
          type='button'
          onClick={() => onRoleChange('moderator')}
          className={`rounded-md px-3 py-2 text-sm ${
            selectedRole === 'moderator'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          } ${!showAllRoles && 'hidden'}`}
        >
          Moderator
        </button>
        <button
          type='button'
          onClick={() => onRoleChange('admin')}
          className={`rounded-md px-3 py-2 text-sm ${
            selectedRole === 'admin'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          } ${!showAllRoles && 'hidden'}`}
        >
          Admin
        </button>
      </div>
    </div>
  )
}
