import React from 'react'
import {Link} from 'react-router-dom'

const Riding = () => {
  return (
 <div className='h-screen'>

    <Link to='/home' className = 'fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
    <i class="text-lg font-medium ri-home-4-line"></i>
    </Link>
      <div className='h-1/2'>
          <img className='h-full w-full object-cover' src="https://th.bing.com/th/id/OIP.Ait2P0IoB2I1wCLskLuvsQHaFw?rs=1&pid=ImgDetMain" alt="" />
      </div>

   <div className='h-1/2 p-3'>
      <div className='flex items-center justify-between mb-4'>
        <img className='h-19' src="https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?rs=1&pid=ImgDetMain" alt="" />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>sultan Ali</h2>
          <h4 className='text-xl font-semibold'>MP 40 MC 7565</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki alto</p>
        </div>
       </div>

       <div className='flex flex-col justify-center items-center'>
       

        <div className='w-full flex flex-col gap-5'>
           
          

      
           <div className='flex items-center gap-5 p-2 border-b-1'>
               <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
               <div>
                  <h3 className='text-lg font-medium'>777/23-B</h3>
                  <p className='text-base -mt-1 text-gray-600'>pali madhya pradesh</p>
               </div>
           </div>

            
           <div className='flex items-center gap-5 mb-3 p-2 border-b-1'>
               <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i class="ri-money-rupee-circle-line"></i></h2>
               <div>
                  <h3 className='text-lg font-medium'>199</h3>
                  <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
               </div>
           </div>
           
           
        </div>

       

       </div>

       <button className='w-full bg-green-500 text-white font-semibold rounded-lg p-2'>Make a payment</button>
     </div>
</div>
  )
}

export default Riding
