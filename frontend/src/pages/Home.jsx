import React, { useRef, useState, useContext,useEffect } from 'react'
import{useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitForDriver from '../components/WaitForDriver'
import LookingForDriver from '../components/LookingForDriver'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {

  const navigate = useNavigate()

  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclepanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidepanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitForDriver, setWaitForDriver] = useState(false)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleImg, setVehicleImg] = useState('')
  const [ride,setRide] = useState(null)
  
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclepanelRef = useRef(null)
  const vehiclePanelCloseRef = useRef(null)
  const confirmRidePnaelRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const waitForDriverRef = useRef(null)

  const {socket} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)

  useEffect(() => {
   
     
    
    
    socket.emit("join", {userType : "user", userId : user?._id})
  },[user]);

  socket.on('ride-confirmed', (ride) => {
   
    setVehicleFound(false)
    setWaitForDriver(true)
    setRide(ride)
    console.log(ride);
    console.log("waiting for driver");
    
    
  })

  socket.on('ride-started', ride => {

    console.log(ride);
    
       setWaitForDriver(false)
       navigate('/riding', {state : {ride}})
  })
  

  const [searchInput, setSearchInput] = useState('')
  const [searchType, setSearchType] = useState('pickup') // Add this state


  const handlePickupClick = () => {
    setPanelOpen(true)
    setSearchType('pickup')
    setSearchInput(pickUp)
  }

  const handleDestinationClick = () => {
    setPanelOpen(true)
    setSearchType('destination')
    setSearchInput(destination)
  }

  // Modify the input change handlers
  const handlePickupChange = (e) => {
    setPickUp(e.target.value)
    setSearchInput(e.target.value)
  }

  const handleDestinationChange = (e) => {
    setDestination(e.target.value)
    setSearchInput(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
   
  }

  const findTrip = async () => {
    setPanelOpen(false)
    setVehiclePanelOpen(true)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickUp,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setFare(response.data)
    console.log(response.data)

  }

  const createRide = async (vehicleType) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup: pickUp,
      destination: destination,
      vehicleType: vehicleType,
      userId : user?._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    // setRideDetails(response.data)
    console.log(response.data)
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

        <LiveTracking/>
      </div>

      <div 
      
      className=' overflow-hidden flex flex-col justify-end h-screen absolute top-3 w-full '>
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
              onClick={handlePickupClick}
              value={pickUp}
              onChange={handlePickupChange}
              className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5' 
              type="text" 
              placeholder='Add a pick-up location' 
            />

            <input 
              onClick={handleDestinationClick}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3' 
              type="text" 
              placeholder='Enter your destination' 
            />
          </form>


         </div>
        

         <div ref={panelRef} className='h-0  bg-white '>
          <LocationSearchPanel 
            findTrip={findTrip}
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanelOpen}
            searchInput={searchInput}
            setPickupLocation={setPickUp}
            setDestinationLocation={setDestination}
            searchType={searchType}
          />
         </div>
      </div>

      <div ref={vehiclepanelRef} className='fixed w-full px-3 py-6 z-1 translate-y-full bg-white bottom-0'>
      
           <VehiclePanel 
           setVehicleImg = {setVehicleImg}
           setVehicleType = {setVehicleType}
           fare = {fare} vehiclePanelCloseRef = {vehiclePanelCloseRef} setConfirmRidePanel = {setConfirmRidePanel} setVehiclePanelOpen = {setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePnaelRef} className='fixed w-full px-3 py-6 z-10 translate-y-full bg-white bottom-0'>
           <ConfirmRide 
           vehicleImg = {vehicleImg}
           pickUp = {pickUp}
           destination = {destination}
            fare = {fare}
            vehicleType = {vehicleType}
            createRide = {createRide}
           setVehicleFound = {setVehicleFound}  setConfirmRidePanel = {setConfirmRidePanel}/>
      </div>

      <div ref={lookingForDriverRef} className='fixed w-full px-3 py-6 z-1 translate-y-full bg-white bottom-0'>
         <LookingForDriver 
          vehicleImg={vehicleImg}
          pickUp = {pickUp}
          destination = {destination}
           fare = {fare}
           vehicleType = {vehicleType}
         setVehicleFound = {setVehicleFound} setConfirmRidePanel = {setConfirmRidePanel}/>
      </div>

      <div ref={waitForDriverRef} className='fixed w-full px-3 py-6 z-10 translate-y-full  bg-white bottom-0'>
         <WaitForDriver 
         ride = {ride}
         setWaitForDriver = {setWaitForDriver}/>
      </div>
    </div>
  )
}

export default Home

// working with home page
