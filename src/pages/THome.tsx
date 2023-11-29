import React from 'react'
import { useState } from 'react'
import '../App.css'
import TE from '../sibear/T.tsx'
import Navigatebear from '../sibear/Navigatebear.tsx'
function THome() {
    return (
        <>
            <TE />
            <div className='flex'>
                <div className="w-fit h-screen bg-[#ffffff]">
                    
                    <Navigatebear/>
                    
                </div>
                <div className='flex flex-1 flex-col p-3 gap-3'>

                    <div className='flex flex-1 gap-3'>
                        <div className='bg-white flex-[2] rounded-xl' />
                        <div className='bg-white flex-1 rounded-xl' />
                    </div>
                    <div className='flex-1 bg-white rounded-xl'></div>
                </div>
            </div>
        </>
    )
}

export default THome