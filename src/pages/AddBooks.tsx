import React from 'react'
import TE from '../sibear/T.tsx'
import Boxbear from '../sibear/Navigatebear.tsx'
function AddBooks() {
  return (
    <>
      <TE />
      <div className='flex'>
        <div className="w-fit h-screen bg-[#ffffff]">
          <Boxbear />
        </div>
        <div className='flex flex-1 flex-col p-3 gap-3'>
          <div className='flex flex-1 gap-3'>
            <div className='flex flex-col flex-[2.4] rounded-xl'>
              <p className='font-bold text-[20px] '>Add book</p>
              <div className='bg-white flex-[2.4] rounded-xl' />
            </div>
            <div className='flex flex-col flex-1 rounded-xl'>
              <p className='font-bold text-[20px] '>Draft</p>
              <div className='bg-white flex-1 rounded-xl' />
            </div>
          </div>

        </div>


      </div>
    </>

  )
}

export default AddBooks