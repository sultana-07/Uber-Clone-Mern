import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

   const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [captainData,setCaptainData] = useState({})
  
    const onSubmit = (e) => {
      e.preventDefault();
      setCaptainData({
        email : email,
        password : password
      })
      console.log(userData);
      
      setEmail('')
      setPassword('')
      
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-4' src="https://static.vecteezy.com/system/resources/previews/027/127/594/large_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        <form onSubmit={onSubmit}>
         <h3 className='text-lg font-medium mb-2'>Enter your E-mail</h3>
         <input 
         type="email" 
         value={email}
         onChange={(e) => {setEmail(e.target.value)}}
         className= 'mb-7 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
         required
          placeholder='email@example.com' />
         <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
         <input
          type="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
            className= 'mb-7 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
           placeholder='enter your password' />
   
          <button
            className= 'mb-3 bg-[#111] text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
          >Login</button> 
         
        </form>
        <p className='text-center'>join a fleet ? <Link to='/captain-signup' className='text-blue-500'>Register as a Captain</Link></p>
        </div>
   
        <div>
         <Link 
         to='/login'
           className= ' bg-[#d5622d] flex items-center justify-center mb-5 text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
         >Sign in as User</Link>
        </div>
       </div>
  )
}

export default CaptainLogin
