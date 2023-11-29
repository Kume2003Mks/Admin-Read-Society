import React from 'react'
import TE from '../sibear/T.tsx'
import Boxbear from '../sibear/Navigatebear.tsx'
function Books_Stoer() {
  return (
    <>
      <TE />
      <div className='flex'>
        <div className="w-fit h-screen bg-[#ffffff]">
          <Boxbear />
        </div>
        <div className='flex flex-1 flex-col p-3 gap-3'>
          <div className='flex flex-1 gap-3'>
            <div className='bg-white flex-[2] rounded-xl' />
            <div className='bg-white flex-1 rounded-xl' />
          </div>
        </div>


      </div>
    </>

  )
}

export default Books_Stoer