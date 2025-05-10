import React, {useState ,useRef} from 'react'
import { Link ,useLocation} from 'react-router-dom'
import{useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const location = useLocation();
    const rideData = location.state?.ride
    const [finishRidepanel, setFinishRidePanel] = useState(false)
    const finishRidepanelRef = useRef(null)

    useGSAP(() => {
        if(finishRidepanel){
         gsap.to(finishRidepanelRef.current, {
           transform : 'translateY(0%)',
         })
      
       
        }else {
         gsap.to(finishRidepanelRef.current, {
           transform : 'translateY(100%)',
         })
      
        
        }
      },[finishRidepanel])
  return (
    <div className='h-screen'>

    <div className='fixed top-0 p-6 flex items-center justify-between w-screen'>
      <img className='w-16' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />

      <Link to='/home' className = 'z-[20] h-10 w-10 bg-white flex items-center justify-center rounded-full'>
    <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>
      <div className='h-4/5 z-[-1]'>
         <LiveTracking/>
      </div>

       <div 
       onClick={() => {
           setFinishRidePanel(true)
       }}
       className='h-1/5 p-6 flex relative items-center justify-between bg-yellow-400'>
       <h5 
    
        className=' p-1  text-center w-[90%] absolute top-0 '>
       <i className="text-3xl ri-arrow-up-wide-line"></i>
       </h5>
           <h4 className='text-xl font-semibold'> 4 KM away</h4>
           <button  className=' bg-green-500 mb-2 text-white font-semibold rounded-lg p-3 px-10'>complete Ride</button>

       </div>

       <div ref={finishRidepanelRef}  className='fixed  w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
            <FinishRide 
             rideData = {rideData}
             setFinishRidePanel = {setFinishRidePanel}
            />
      </div>

      <div className='h-full'>
        
      </div>

     
</div>
  )
}

export default CaptainRiding
