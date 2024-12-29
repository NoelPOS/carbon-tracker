import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// User Imports
import UserLayout from './components/user/UserLayout'
import Footer from './components/Footer'
import Home from './pages/user/Home'
import Articles from './pages/user/Articles'
import ArticleDetail from './pages/user/ArticleDetail'
import Leaderboard from './pages/user/Leaderboard'
import Profile from './pages/user/Profile'
import Survey from './pages/user/Survey'

// Moderator Imports
import ModeratorLayout from './components/moderator/ModeratorLayout'
import ModeratorHome from './pages/moderator/ModeratorHome'
import ModeratorArticles from './pages/moderator/ModeratorArticles'
import CreateArticle from './pages/moderator/CreateArticle'
import EditArticle from './pages/moderator/EditArticle'

// Admin Imports
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Moderators from './pages/admin/Moderators'
import Questions from './pages/admin/Questions'
import AdminArticles from './pages/admin/Articles'

export default function App() {
  return (
    <Router>
      <div className='flex min-h-screen flex-col bg-gray-50'>
        <div className='flex-grow'>
          <main>
            <Routes>
              {/* Auth routes */}

              {/* to be continued */}

              {/* User routes */}
              <Route
                path='/user/*'
                element={
                  <UserLayout>
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/articles' element={<Articles />} />
                      <Route path='/articles/:id' element={<ArticleDetail />} />
                      <Route path='/leaderboard' element={<Leaderboard />} />
                      <Route path='/profile' element={<Profile />} />
                      <Route path='/survey' element={<Survey />} />
                    </Routes>
                  </UserLayout>
                }
              />

              {/* Moderator routes */}
              <Route
                path='/moderator/*'
                element={
                  <ModeratorLayout>
                    <Routes>
                      <Route path='/' element={<ModeratorHome />} />
                      <Route path='/articles' element={<ModeratorArticles />} />
                      <Route
                        path='/articles/create'
                        element={<CreateArticle />}
                      />
                      <Route
                        path='/articles/:id/edit'
                        element={<EditArticle />}
                      />
                      <Route path='/profile' element={<Profile />} />
                    </Routes>
                  </ModeratorLayout>
                }
              />

              {/* Admin routes */}
              <Route
                path='/admin/*'
                element={
                  <AdminLayout>
                    <Routes>
                      <Route path='/' element={<Dashboard />} />
                      <Route path='/users' element={<Users />} />
                      <Route path='/moderators' element={<Moderators />} />
                      <Route path='/articles' element={<AdminArticles />} />
                      <Route path='/questions' element={<Questions />} />
                    </Routes>
                  </AdminLayout>
                }
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  )
}
