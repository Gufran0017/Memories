import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/auth';

const Login = () => {

  
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${api}/api/auth/login`, formData);
      console.log(res.data);
      setFormData({email: '', password: ''});
      storeTokenInLs(res.data.token);
      console.log('In login form ',res.data.token);
      navigate('/post');
    }
    catch(error) {
      console.log("Login error! ", error);
    }
  }

  return (
    <div className='register'>
      <h1>Login Now</h1>
      <form onSubmit={submitHandler} className='contact-col'>
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={formData.email}

            onChange={handleChange}
            required
          />
          <input
            type="password"
            name='password'
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* <p className='error-para'>{errorMsg}</p> */}
          <button className='submit-btn' type="submit"> Login </button>
        </form>
        <p>Dont't have an account? <Link className='log-link' to='/register'>Register Now</Link></p>
    </div>
  )
}

export default Login
