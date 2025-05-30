import React from 'react'

const WaitForDriver = ({setWaitForDriver,ride}) => {
  return (
    <div>
    <h5 
      onClick={() => setWaitForDriver(false)}
        className='absolute opacity-0 right-6 top-6 text-3xl'>
       <i className="text-black ri-arrow-down-wide-line"></i>
       </h5>

       <div className='flex items-center justify-between mb-4'>
        <img className='h-19' src="https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?rs=1&pid=ImgDetMain" alt="" />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-semibold'>{ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki alto</p>
          <h1 className='text-lg font-semibold'>{ride?.otp}</h1>
        </div>
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

       

       </div>
</div>
  )
}

export default WaitForDriver
