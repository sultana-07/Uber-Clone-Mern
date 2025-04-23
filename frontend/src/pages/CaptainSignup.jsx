import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate = useNavigate()
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const {captain,setCaptain} = useContext(CaptainDataContext)
  
    const submitHandler = async (e) => {
      e.preventDefault();
       
      const captainData = {
        fullname : {
          firstname : firstname,
          lastname : lastname,
        },
        email : email,
        password : password,
        vehicle : {
          color : vehicleColor,
          plate : vehiclePlate,
          capacity : vehicleCapacity,
          vehicleType : vehicleType
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)

      if(response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        console.log(response.data.token);
        
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      };
     
      
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
      setVehicleCapacity('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleType('')
    };

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

      {/* demo */}

     
  
    {/* Add Vehicle Information Section */}
    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
    
    <div className='mb-5'>
      <input 
        type="text" 
        value={vehicleColor}
        onChange={(e) => setVehicleColor(e.target.value)}
        className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required
        placeholder='Vehicle Color' />

      <input 
        type="text" 
        value={vehiclePlate}
        onChange={(e) => setVehiclePlate(e.target.value)}
        className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required
        placeholder='License Plate Number' />

      <input 
        type="number" 
        value={vehicleCapacity}
        onChange={(e) => setVehicleCapacity(e.target.value)}
        className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required
        min="1"
        placeholder='Vehicle Capacity' />

      <select 
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg'
        required>
        <option value="">Select Vehicle Type</option>
        <option value="car">Car</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="auto">Auto</option>
      </select>
    </div>

  

      {/* demo */}

      <button
        className= 'mb-3 bg-[#111] text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Register as Captain</button> 
     
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
