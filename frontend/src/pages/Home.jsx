import React, { useRef, useState } from 'react'
import{useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitForDriver from '../components/WaitForDriver'
import LookingForDriver from '../components/LookingForDriver'

const Home = () => {

  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclepanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidepanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitForDriver, setWaitForDriver] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclepanelRef = useRef(null)
  const vehiclePanelCloseRef = useRef(null)
  const confirmRidePnaelRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const waitForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
   
  }

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height : '70%',
        padding : 24
      })
      gsap.to(panelCloseRef.current, {
        opacity : 1,
        duration : 0.5
      })
    }else {
      gsap.to(panelRef.current, {
        height : '0%'
      })

      gsap.to(panelCloseRef.current, {
        opacity : 0,
        duration : 0.5
      })
    }
  },[panelOpen])

  useGSAP(() => {
     if(vehiclepanelOpen){
      gsap.to(vehiclepanelRef.current, {
        transform : 'translateY(0%)',
      })

      gsap.to(vehiclePanelCloseRef.current, {
        opacity : 1,
        duration : 0.5
      })
     }else {
      gsap.to(vehiclepanelRef.current, {
        transform : 'translateY(100%)',
      })

      gsap.to(vehiclePanelCloseRef.current, {
        opacity : 0,
        duration : 0.5
      })
     }
  },[vehiclepanelOpen])

  useGSAP(() => {
    if(confirmRidepanel){
     gsap.to(confirmRidePnaelRef.current, {
       transform : 'translateY(0%)',
     })

   
    }else {
     gsap.to(confirmRidePnaelRef.current, {
       transform : 'translateY(100%)',
     })

    
    }
 },[confirmRidepanel])

 useGSAP(() => {
  if(vehicleFound){
   gsap.to(lookingForDriverRef.current, {
     transform : 'translateY(0%)',
   })

 
  }else {
   gsap.to(lookingForDriverRef.current, {
     transform : 'translateY(100%)',
   })

  
  }
},[vehicleFound])

useGSAP(() => {
  if(waitForDriver){
   gsap.to(waitForDriverRef.current, {
     transform : 'translateY(0%)',
   })

 
  }else {
   gsap.to(waitForDriverRef.current, {
     transform : 'translateY(100%)',
   })

  
  }
},[waitForDriver])
  
  return (
    <div 
   
    className='relative h-screen' >
      <img className='w-16 absolute left-5 top-5' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="" />

      <div 
       
      className='h-screen w-screen'>
        {/* image for temporary use */}

        <img className='h-full w-full object-cover' src="https://th.bing.com/th/id/OIP.Ait2P0IoB2I1wCLskLuvsQHaFw?rs=1&pid=ImgDetMain" alt="" />
      </div>

      <div 
      
      className=' overflow-hidden flex flex-col justify-end h-screen absolute top-0 w-full'>
         <div className='h-[30%] p-5 bg-white relative'>

           <h5 
           ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 right-6 top-6 text-3xl'>
           <i className="ri-arrow-down-wide-line"></i>
           </h5>
             <h4 className='text-2xl font-semibold'>Find a trip</h4>

             <form onSubmit={submitHandler}>
               
              <div className='line absolute h-16 w-1 top-[45%] left-10 bg-black'></div> 
              <input 
              onClick={() => setPanelOpen(true)}
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />

             <input 
               onClick={() => setPanelOpen(true)}
             value={destination}
              onChange={(e) => setDestination(e.target.value)}
             className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
             </form>

         </div>

         <div ref={panelRef} className='h-0 bg-white'>
            <LocationSearchPanel setPanelOpen ={setPanelOpen} setVehiclePanel={setVehiclePanelOpen}/>
         </div>
      </div>

      <div ref={vehiclepanelRef} className='fixed w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
      
           <VehiclePanel vehiclePanelCloseRef = {vehiclePanelCloseRef} setConfirmRidePanel = {setConfirmRidePanel} setVehiclePanelOpen = {setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePnaelRef} className='fixed w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
           <ConfirmRide setVehicleFound = {setVehicleFound}  setConfirmRidePanel = {setConfirmRidePanel}/>
      </div>

      <div ref={lookingForDriverRef} className='fixed w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
         <LookingForDriver setVehicleFound = {setVehicleFound} setConfirmRidePanel = {setConfirmRidePanel}/>
      </div>

      <div ref={waitForDriverRef} className='fixed w-full px-3 py-6 z-10 translate-y-full  bg-white bottom-0'>
         <WaitForDriver setWaitForDriver = {setWaitForDriver}/>
      </div>
    </div>
  )
}

export default Home

// working with home page
