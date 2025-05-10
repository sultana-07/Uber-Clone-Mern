import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
            <div className='flex items-center justify-between'>
             <div className='flex items-center justify-start gap-2'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://subpng.com/images/hd/casual-random-person-portrait-png-wxb89-8b2q9aafvn0s792w.jpg" alt="" />
                <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
             </div>

             <div>
              <h4 className='text-xl font-semibold'>₹299.20</h4>
              <p className='text-sm font-medium'>Earned</p>
             </div>
          </div>

          <div className='flex p-3 mt-6 bg-gray-500 rounded-xl justify-center gap-5 items-start' > 
            <div className='text-center'>
            <i className="text-2xl font-thin ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
            </div>

            <div className='text-center'>
            <i className="text-2xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
            </div>

            <div className='text-center'>
            <i className="text-2xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails
