
import React from 'react'

const VehiclePanel = ({setVehiclePanelOpen,setConfirmRidePanel,vehiclePanelCloseRef,fare,setVehicleType,setVehicleImg}) => {

  const vehicle = {
    car : "https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?rs=1&pid=ImgDetMain",
    motorcycle : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  }
  return (
    <div>
         <h5 
           ref={vehiclePanelCloseRef}
            onClick={() => setVehiclePanelOpen(false)}
            className='absolute opacity-0 right-6 top-6 text-3xl'>
           <i className="ri-arrow-down-wide-line"></i>
           </h5>

           <h3 className='font-semibold text-2xl mb-5'>Choose a Vehicle</h3>
           
           <div
           onClick={() => {
            setConfirmRidePanel(true)
            setVehiclePanelOpen(false)
            setVehicleType('car')
            setVehicleImg(vehicle.car)
           }}
           className='flex w-full p-3 border-2 mb-2 border-black rounded-xl items-center justify-between'>
            <img className='h-14' src={vehicle.car} alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs'>Affordable, compact rides</p>
            </div>
            <h4 className='font-medium text-lg'>₹{fare.car}</h4>
           </div>

           <div
           onClick={() =>{
            setConfirmRidePanel(true)
            setVehiclePanelOpen(false)
            setVehicleType('motorcycle')
            setVehicleImg(vehicle.motorcycle)
           }}
           className='flex w-full p-3 border-2 mb-2 border-black rounded-xl items-center justify-between'>
            <img className='h-14' src={vehicle.motorcycle} alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs'>Affordable, compact rides</p>
            </div>
            <h4 className='font-medium text-lg'>₹{fare.motorcycle}</h4>
           </div>

           <div 
           onClick={() => {
            setConfirmRidePanel(true)
            setVehiclePanelOpen(false)
            setVehicleType('auto')
            setVehicleImg(vehicle.auto)
           }}
           className='flex w-full p-3 border-2 mb-2 border-black rounded-xl items-center justify-between'>
            <img className='h-14' src={vehicle.auto} alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
              <h5 className='font-medium text-sm'>12 mins away</h5>
              <p className='font-normal text-xs'>Affordable, compact rides</p>
            </div>
            <h4 className='font-medium text-lg'>₹{fare.auto}</h4>
           </div>
    </div>
  )
}

export default VehiclePanel
