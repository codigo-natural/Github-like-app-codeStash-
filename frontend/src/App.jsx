import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePaje'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { ExplorePage } from './pages/ExplorePage'
import { LikesPage } from './pages/LikesPage'

import { Sidebar } from "./components/Sidebar"

import { useAuthContext } from './context/AuthContext'

import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

export default function App() {
  const { authUser, loading } = useAuthContext();

  if (loading) return null

  return (
    <div className="flex">
      <Sidebar />
      <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} />
          <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}