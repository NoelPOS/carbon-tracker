export const ROLE_ROUTES = {
  user: '/user',
  moderator: '/moderator',
  admin: '/admin',
}

export const canSignUp = (role) => role === 'user'

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
