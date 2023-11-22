
import { Icon } from '@iconify/react';
function Boxbear({TBOXT,icon}:any) {
  return (
    <div className='bg-[#ffffff] w-[200px] py-[15px]  '>
        <a href="#" >
            <p className=' flex px-[15px] items-center '>
            <Icon icon={icon} color="#7A7A7A" width="24" height="30" className='mr-2' />
                {TBOXT}
            </p>
        </a>
    </div>
  )
}

export default Boxbear