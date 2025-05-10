import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = ({rideData,setFinishRidePanel}) => {

   const navigate = useNavigate()

   const endRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
          rideId : rideData._id
        }, {
           headers : {
            Authorization  : `Bearer ${localStorage.getItem('token')}`
           }
        })

        if(response.status === 200){
         setFinishRidePanel(false)
         navigate('/captain-home')
        }
   }
  return (
    <div>
    

    <h3 className='font-semibold text-2xl mb-5'>Finish this Ride</h3>

    <div className='flex justify-between items-center bg-yellow-400 rounded-lg p-3 mt-4 mb-3'> 
     <div className='flex items-center  gap-4  '>
     <img className='h-12 w-12 rounded-full object-cover' src="https://subpng.com/images/hd/casual-random-person-portrait-png-wxb89-8b2q9aafvn0s792w.jpg" alt="" />
     <h2 className='text-xl font-mediun'>{rideData?.user.fullname.firstname}</h2>
     </div>
     <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>

    <div className='flex flex-col justify-center items-center'>
    

     <div className='w-full flex flex-col gap-5'>
        
        <div className='flex items-center gap-5 p-2 border-b-1'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
            <div>
               <h3 className='text-lg font-medium'>562/23-B</h3>
               <p className='text-base -mt-1 text-gray-600'>{rideData?.pickup}</p>
            </div>
        </div>

         
        <div className='flex items-center gap-5 p-2 border-b-1'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
            <div>
               <h3 className='text-lg font-medium'>777/23-B</h3>
               <p className='text-base -mt-1 text-gray-600'>{rideData?.destination}</p>
            </div>
        </div>

         
        <div className='flex items-center gap-5 mb-3 p-2 border-b-1'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-money-rupee-circle-line"></i></h2>
            <div>
               <h3 className='text-lg font-medium'>{rideData?.fare}</h3>
               <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
            </div>
        </div>
        
        
     </div>
     
   
     <div className='mt-6 w-full'>
        

          
         <button 
         onClick={endRide}
         to='/captain-home'
        className='flex justify-center w-full bg-green-500 mb-2 text-white font-semibold rounded-lg p-2'>Finish Ride</button>

        <p className='text-red-500 text-center mt-6 text-sm'>Click on finish ride button if you have completed the payment</p>
        
     </div>

    </div>
</div>
  )
}

export default FinishRide
