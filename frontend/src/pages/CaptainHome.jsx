import React, {useState,useRef,useContext, useEffect} from 'react'
import 'remixicon/fonts/remixicon.css'
import {Link} from 'react-router-dom'
import{useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [ride,setRide] = useState({})
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit("join", {userType : "captain", userId : captain._id})

  

    const updateLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          console.log({
            userId : captain._id,
            location : {
              ltd : position.coords.latitude,
              lng : position.coords.longitude,
            }
          });
          
           socket.emit("update-location-captain", {
             userId : captain._id,
          
              ltd : position.coords.latitude,
              lng : position.coords.longitude,
            }
          
           )
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
   updateLocation()

  },[])

  socket.on('new-ride', (data) => {
  
    
    setRide(data)
    setRidePopUpPanel(true)
    
    
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId: ride._id,
        captainId: captain._id,


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    setRidePopUpPanel(false)
    setConfirmRidePanel(true)

}

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

      <Link to='/captain-home' className = ' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
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
           <RidePopUp 
           ride = {ride}
             confirmRide = {confirmRide}
           setRidePopUpPanel = {setRidePopUpPanel} 
           setConfirmRidePanel = {setConfirmRidePanel} />
         
      </div>

      <div ref={confirmRidePanelRef}  className='fixed h-screen w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
           <ConfirmRidePopUp 
           ride = {ride}
           setRidePopUpPanel = {setRidePopUpPanel} 
           setConfirmRidePanel = {setConfirmRidePanel} />
      </div>
</div>
  )
}

export default CaptainHome
