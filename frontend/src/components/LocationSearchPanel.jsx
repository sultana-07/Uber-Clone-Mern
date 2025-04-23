import React from 'react'

const LocationSearchPanel = ({setVehiclePanel,setPanelOpen}) => {

    // sample array for location data

    const location = [
        "4B, near Kappor's cafe, Bhopal bear madhya pradesh",
        "6B, near sultan's cafe, Bhopal bear madhya pradesh",
        "8B, near irfan's cafe, Bhopal bear madhya pradesh",
        "42B, near rizwan's cafe, Bhopal bear madhya pradesh",

    ]
  return (
    <div>   
      {/* this is just a sample data */}
      {location.map((elem,idx) => {
        return (
            <div key={idx} onClick={() => {
            setVehiclePanel(true)
            setPanelOpen(false)
          }}
           
            className='flex gap-4 border-2 p-3 border-white active:border-black rounded-xl my-4 items-center justify-start'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        )
      })}

     
    </div>                                                                                                  
  )
}

export default LocationSearchPanel
