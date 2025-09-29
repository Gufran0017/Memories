import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log(res.data);
            setFormData({name: '', email: '', password: ''});
            navigate('/login');
        }
        catch(error) {
            console.log("Registration error! ", error);
        }
    }

  return (
    <div className='register'>
      <h1>Register Now</h1>
      <form onSubmit={submitHandler} className='contact-col'>
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name='email'
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </>
      
            <input
              type="password"
              name='password'
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* <p className='error-para'>{errorMsg}</p> */}
          <button className='submit-btn' type="submit"> Signup </button>
        </form>
        <p>Already have an account? <Link className='log-link' to='/login'>Login Now</Link></p>
    </div>
  )
}

export default Register
