
import { Icon } from '@iconify/react';

function T() {
  return (
    <div className=' justify-start text-[20px] '>
      <div className='flex'>
        <div className='px-[20px] bg-[rgb(71,181,255)] w-[201px] h-[60px] py-[15px]'>
          <img src="RD_white.png" width="130" className='mt-[-9px] ml-[10px] ' />

        </div>
        <div className='bg-[#ffffff] flex-1 ' >
        <div className='flex my-[13px] justify-end '>
          <Icon icon="bxs:message" color="#7a7a7a" width="30" height="30" className='mr-[20px]' />
          <Icon icon="mdi:bell" color="#7a7a7a" width="30" height="30" className='mr-[20px]' />
          <div className='flex mx-[10px]'>
            <p className='mx-[10px]'>Will Smith</p>
            <img src="https://www.techhub.in.th/wp-content/uploads/2021/05/577280151-1.jpg" alt="MeMe" className=' h-[35px] w-[35px] ml-[10px] rounded-full' />
          </div>
          <Icon icon="mingcute:menu-fill" color="#7a7a7a" width="30" height="30" className='mx-[20px]' />
        </div>
        
      </div>
      </div>
      
    </div>
  )
}

export default T