import React, {useEffect,useContext} from 'react'
import {Link,useLocation} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {

   const location = useLocation();
   const rideData = location.state?.ride || {}

   const {socket} = useContext(SocketContext)
   const navigate = useNavigate();

   socket.on('ride-ended', () => {
      navigate('/home')
   })



   console.log(rideData);
   
  return (
 <div className='h-screen'>

    <Link to='/home' className = 'fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
    <i class="text-lg font-medium ri-home-4-line"></i>
    </Link>
      <div className='z-[-1]' >
          <LiveTracking/>
      </div>

   <div className='h-1/2 p-3 z-30 mb-30'>
      <div className='flex items-center justify-between mb-4'>
        <img className='h-19' src="https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?rs=1&pid=ImgDetMain" alt="" />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>{rideData?.captain.fullname.firstname + " "+rideData?.captain.fullname.lastname }</h2>
          <h4 className='text-xl font-semibold uppercase'>{rideData?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki alto</p>
        </div>
       </div>

       <div className='flex flex-col justify-center items-center'>
       

        <div className='w-full flex flex-col gap-5'>
           
          

      
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

       

       </div>

       <button className='w-full bg-green-500 text-white font-semibold rounded-lg p-2'>Make a payment</button>
     </div>
</div>
  )
}

export default Riding
