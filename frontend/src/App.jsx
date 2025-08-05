import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  // console.log("Auth User:", authUser);
  if(isCheckingAuth && !authUser) return(
    <div className=' flex items-center justify-center h-screen'>
      <Loader className='animate-spin size-10'/>

    </div>
  )
  
  return (
    <div >
    <Navbar/>
    <Routes>
      <Route path ="/" element={authUser?<Home/>:<Navigate to="/login"/>} />
      <Route path ="/signup" element={!authUser?<SignUpPage />:<Navigate to="/"/>} />
      <Route path ="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>} />
      <Route path ="/profile" element={authUser?<ProfilePage />:<Navigate to="/login"/>} />

    </Routes>
    <Toaster/>
      
    </div>
  )
}

export default App
