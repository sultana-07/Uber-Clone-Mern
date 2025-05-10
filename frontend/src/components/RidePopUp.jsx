import React from 'react'
import 'remixicon/fonts/remixicon.css'
const RidePopUp = ({setRidePopUpPanel,setConfirmRidePanel,ride,confirmRide}) => {
  return (
    <div>
      <h5 
           onClick={() => 
            {
                setRidePopUpPanel(false)
                

           }}
            className='absolute right-6 top-6 text-3xl '>
           <i className="ri-arrow-down-wide-line"></i>
           </h5>

           <h3 className='font-semibold text-2xl mb-5'> New Ride Avaliable</h3>

           <div className='flex justify-between items-center bg-yellow-400 rounded-lg p-3 mt-4 mb-3'> 
            <div className='flex items-center  gap-4  '>
            <img className='h-12 w-12 rounded-full object-cover' src="https://subpng.com/images/hd/casual-random-person-portrait-png-wxb89-8b2q9aafvn0s792w.jpg" alt="" />
            <h2 className='text-xl font-mediun'>{ride?.user?.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.4 KM</h5>
           </div>

           <div className='flex flex-col justify-center items-center'>
           

            <div className='w-full flex flex-col gap-5'>
               
               <div className='flex items-center gap-5 p-2 border-b-1'>
                   <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
                   <div>
                      <h3 className='text-lg font-medium'>562/23-B</h3>
                      <p className='text-base -mt-1 text-gray-600'>{ride?.pickup}</p>
                   </div>
               </div>

                
               <div className='flex items-center gap-5 p-2 border-b-1'>
                   <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
                   <div>
                      <h3 className='text-lg font-medium'>777/23-B</h3>
                      <p className='text-base -mt-1 text-gray-600'>{ride?.destination}</p>
                   </div>
               </div>

                
               <div className='flex items-center gap-5 mb-3 p-2 border-b-1'>
                   <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-money-rupee-circle-line"></i></h2>
                   <div>
                      <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                      <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
                   </div>
               </div>
               
               
            </div>

            <button 
            onClick={() =>{ 
                setRidePopUpPanel(false)
                setConfirmRidePanel(true)
                confirmRide()
            }}
                
            className='w-full bg-green-500 mb-2 text-white font-semibold rounded-lg p-2'>Accept</button>

            <button 
            onClick={() =>{ 
                setRidePopUpPanel(false)
                
            }}
                
            className='w-full bg-gray-300  text-gray-700 font-semibold rounded-lg p-2'>Ignore</button>

           </div>
    </div>
  )
}

export default RidePopUp
