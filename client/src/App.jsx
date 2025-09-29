import React, { useState } from 'react'
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Post from './pages/Post'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '');

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/post' element={<Post token = {token}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </div>
  )
}

export default App
