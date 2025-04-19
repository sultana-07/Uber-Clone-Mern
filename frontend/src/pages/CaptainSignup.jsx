import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

  const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userData,setUserData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault();
       
      setUserData({
        fullname : {
          firstname : firstname,
          lastname : lastname,
        },
        email : email,
        password : password
      })
      console.log(userData);
      
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-4' src="https://static.vecteezy.com/system/resources/previews/027/127/594/large_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
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
    <p className='text-center'>Already have a Account ? <Link to='/captain-login' className='text-blue-500'>Login here</Link></p>
    </div>

    <div>
    <p className='text-xs'>Rhis site is protected by reCAPTCHA and the <span className='underline'>Google policy</span> and <span className='underline'>Terms of Service apply </span>
    </p>
    </div>
   </div>
  )
}

export default CaptainSignup
