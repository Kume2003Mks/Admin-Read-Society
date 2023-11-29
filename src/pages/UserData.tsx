import React from 'react'
import TE from '../sibear/T.tsx'
import Boxbear from '../sibear/Navigatebear.tsx'
function UserData() {
  return (<>
    <TE/>
    <div className='flex'>
        <div className="w-fit h-screen bg-[#ffffff]">
            <Boxbear/>
        </div>
        <div>UserData</div>
 
        
    </div>
    </>
    
  )
}

export default UserData