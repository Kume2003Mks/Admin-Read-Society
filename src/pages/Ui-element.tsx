import React from 'react'
import TE from '../sibear/T.tsx'
import Boxbear from '../sibear/Navigatebear.tsx'
function Ui_element() {
  return (
    <>
    <TE/>
    <div className='flex'>
        <div className="w-fit h-screen bg-[#ffffff]">
            <Boxbear/>
        </div>
        <div className='flex flex-1 flex-col p-3 gap-3'>
          <p className='font-bold text-[20px] '>Banner</p>
          <div className='flex flex-1 gap-3'>
            <div className='bg-white flex-1 rounded-xl'/>
          </div>
          <div className='flex-1 bg-white rounded-xl'></div>
          <p className='font-bold text-[20px]'>Post blog</p>
          <div className='flex-1 bg-white rounded-xl'></div>
        </div>
        
        
        
    </div>
    </>
  )
}

export default Ui_element