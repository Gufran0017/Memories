import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useAuth } from '../store/auth'

const Navbar = () => {

  const { isLoggedIn } = useAuth();

  return (
    <>
      <nav className='navbar'>
        <div className='nav-logo'>
            <h1>Memories</h1>
        </div>
        <ul className='nav-links'>
            <li> <NavLink to='/'>Home</NavLink></li>
            <li> <NavLink to='/about'>About</NavLink></li>
            <li> <NavLink to='/contact'>Contact</NavLink></li>
            <li> <NavLink to='/post'>Post</NavLink></li>
        </ul>
        <div className='login-btn'>

          {isLoggedIn ? 
            <Link to='/logout'><button>Logout</button></Link>
            :
            <Link to='/login'><button>Login</button></Link>
          }
            
        </div>
      </nav>
    </>
  )
}

export default Navbar
