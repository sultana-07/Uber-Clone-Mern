import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LookingForDriver = ({setVehicleFound,setConfirmRidePanel,pickUp,destination,fare,vehicleType,vehicleImg}) => {
  return (
    <div>
    <h5 
       onClick={() =>{ setVehicleFound(false)
         setConfirmRidePanel(false) 
       }}
        className='absolute  right-6 top-6 text-3xl'>
       <i className="ri-arrow-down-wide-line"></i>
       </h5>

       <h3 className='font-semibold text-2xl mb-5'>Looking for a Driver</h3>

       <div className='flex flex-col justify-center items-center'>
        <img className=' w-42' src={vehicleImg || null} alt="" />

        <div className='w-full flex flex-col gap-5'>
           
           <div className='flex items-center gap-5 p-2 border-b-1'>
               <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
               <div>
                  <h3 className='text-lg font-medium'>562/23-B</h3>
                  <p className='text-base -mt-1 text-gray-600'>{pickUp}</p>
               </div>
           </div>

            
           <div className='flex items-center gap-5 p-2 border-b-1'>
               <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
               <div>
                  <h3 className='text-lg font-medium'>777/23-B</h3>
                  <p className='text-base -mt-1 text-gray-600'>{destination}</p>
               </div>
           </div>

            
           <div className='flex items-center gap-5 mb-3 p-2 border-b-1'>
               <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-money-rupee-circle-line"></i></h2>
               <div>
                  <h3 className='text-lg font-medium'>₹ {fare[vehicleType]}</h3>
                  <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
               </div>
           </div>
           
           
        </div>

       

       </div>
</div>
  )
}

export default LookingForDriver
