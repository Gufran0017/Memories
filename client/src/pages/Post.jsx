import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, useAuth } from '../store/auth'
import axios from 'axios';
import MemoryCard from '../components/MemoryCard';

const Post = ({token}) => {

  const { isLoggedIn} = useAuth();
  
  const api = import.meta.env.VITE_API_URL;

  const {allMemories, setRefresh} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    file: null,
    people: '',
    location: '',
  });

  const inputHandler = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const fileHandler = (e) => {

    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      // merge old files + new files
      file: [...(prev.file || []), ...newFiles]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('summary', formData.summary);
      
       if (formData.file && formData.file.length > 0) {
        for (let i = 0; i < formData.file.length; i++) {
          payload.append('images', formData.file[i]);
        }
      }
      
      formData.people
      .split(',')
      .map(p => p.trim())
      .forEach(p => payload.append('people[]', p));
      
      payload.append('location', formData.location);

      const res = await axios.post(`${api}/api/user/memories`, payload, {headers: {Authorization: `Bearer ${token}`}});
      console.log(token);
      console.log(res.data);
      setRefresh(prev => !prev);
    } 
    catch(error) {
      console.log("Post Error! ", error);
    }
  };

  return (
    <>
    {
      isLoggedIn ?
        <div className='memory-body'>

          <div className='left-body'>
            <h1>Add Memories</h1>
            <form onSubmit={handleSubmit} className='memory-form'>
              <input type="text" placeholder='Enter Title' name='title' value={formData.title} onChange={inputHandler}/>
              <input type="text" placeholder='Summary' name='summary' value={formData.summary} onChange={inputHandler}/>
              <input type="file" name='file' multiple onChange={fileHandler}/>
              <input type="text" placeholder='Tag People' name='people' value={formData.people} onChange={inputHandler}/>
              <input type="text" placeholder='Location' name='location' value={formData.location} onChange={inputHandler}/>
              <button type='submit'>Post</button>
            </form>
          </div>

          <div className='right-body'>
            {
              allMemories.length === 0 ? 
                <div className='no-memory'>'No Memory Fonund'</div>
                :
                <div className='memory-grid'>
                  {allMemories.map((m) => (
                    <MemoryCard key={m._id} memory={m} />
                  ))}
                </div>
            }
          </div>

        </div>
      :

        <div className='hero'>
          <h1>You need to <span>Login</span> to post a <span>Memory.</span> Register if you are a new <span>User,</span> <br /> If <span>Already</span> regitered just <span>Login.</span> </h1>
        </div>
    }
    </>
  )
}

export default Post
