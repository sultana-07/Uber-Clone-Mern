import React, { useContext, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {

  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  

  const {user,setUser} = useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
     
    const newUser = {
      fullname : {
        firstname : firstname,
        lastname : lastname,
      },
      email : email,
      password : password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){
      const data = response.data
      console.log(data);
      

      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-4' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />
    <form onSubmit={submitHandler}>

     <h3  className='text-lg font-medium mb-2'>what's your name</h3> 
     <div className='flex gap-3 mb-5'>
     <input 
     type="text" 
     value={firstname}
     onChange={(e) => {setFirstname(e.target.value)}}
     className= 'bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
     required
     placeholder='First Name' />

    <input 
     type="text" 
     value={lastname}
     onChange={(e) => {setLastname(e.target.value)}}
     className= ' bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
     required
     placeholder='Last Name' />

     </div>
     <h3 className='text-lg font-medium mb-2'>Enter your E-mail</h3>
     <input 
     type="email" 
     value={email}
     onChange={(e) => {setEmail(e.target.value)}}
     className= 'mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
     required
      placeholder='email@example.com' />
     <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
     <input
      type="password"
      value={password}
      onChange={(e) => {setPassword(e.target.value)}}
      className= 'mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      placeholder='enter your password' />

      <button
        className= 'mb-3 bg-[#111] text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Register</button> 
     
    </form>
    <p className='text-center'>Already have a Account ? <Link to='/login' className='text-blue-500'>Login here</Link></p>
    </div>

    <div>
    <p className='text-xs'>By proceeding, you consent to get calls, Whatsapp or SMS messages, including by automated means, 
      from Uber and its affiliates to the number provider.
    </p>
    </div>
   </div>
  )
}

export default UserSignup
