import React from 'react'
import { Icon } from '@iconify/react';

function T() {
  return (
    <div className=' justify-start text-[20px] '>
      <div className='flex'>
        <div className='px-[20px] bg-[rgb(71,181,255)] w-[224px] py-[15px] text-white font-bold'>READ SOCIETY</div>
        <div className='bg-[#ffffff] w-full ' >
        <div className='flex my-[13px] w-full justify-end '>
          <Icon icon="bxs:message" color="#7a7a7a" width="30" height="30" />
          <Icon icon="mdi:bell" color="#7a7a7a" width="30" height="30" />
          <div className='flex mx-[10px]'>
            <p>OK</p>
            <div className='bg-black h-[35px] w-[35px] ml-[10px] rounded-full'></div>
          </div>
          <Icon icon="mingcute:menu-fill" color="#7a7a7a" width="30" height="30" />
        </div>
        
      </div>
      </div>
      
    </div>
  )
}

export default T