import React, {useState,useRef} from 'react'
import 'remixicon/fonts/remixicon.css'
import {Link} from 'react-router-dom'
import{useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  useGSAP(() => {
    if(ridePopUpPanel){
     gsap.to(ridePopUpPanelRef.current, {
       transform : 'translateY(0%)',
     })
  
   
    }else {
     gsap.to(ridePopUpPanelRef.current, {
       transform : 'translateY(100%)',
     })
  
    
    }
  },[ridePopUpPanel])

  useGSAP(() => {
    if(confirmRidePanel){
      setRidePopUpPanel(false)
     gsap.to(confirmRidePanelRef.current, {
       transform : 'translateY(0%)',
     })
  
   
    }else {
     gsap.to(confirmRidePanelRef.current, {
       transform : 'translateY(100%)',
     })
  
    
    }
  },[confirmRidePanel])
  return (
    <div className='h-screen'>

    <div className='fixed top-0 p-6 flex items-center justify-between w-screen'>
      <img className='w-16' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />

      <Link to='/home' className = ' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
    <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>
      <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://th.bing.com/th/id/OIP.Ait2P0IoB2I1wCLskLuvsQHaFw?rs=1&pid=ImgDetMain" alt="" />
      </div>

       <div className='h-2/5 p-6'>
            <CaptainDetails/>

       </div>

       <div ref={ridePopUpPanelRef}  className='fixed w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
           <RidePopUp setRidePopUpPanel = {setRidePopUpPanel} setConfirmRidePanel = {setConfirmRidePanel} />
      </div>

      <div ref={confirmRidePanelRef}  className='fixed h-screen w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
           <ConfirmRidePopUp setConfirmRidePanel = {setConfirmRidePanel} />
      </div>
</div>
  )
}

export default CaptainHome
