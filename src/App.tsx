import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TE from './sibear/T'
import Boxbear from './sibear/Boxbear.tsx'
import { Icon } from '@iconify/react';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TE/>
    <div className="w-fit h-screen bg-[#ffffff]">
      
    
    <Boxbear icon='ic:round-dashboard' TBOXT='Dashboard' />
    <Boxbear icon='radix-icons:dashboard' TBOXT='UI-Element' />
    <Boxbear icon='wpf:books' TBOXT='Books Store' />
    <Boxbear icon='fluent:book-add-24-filled' TBOXT='Add books' />
    <Boxbear icon='material-symbols:edit' TBOXT='Edit books' />
    <Boxbear icon='fluent:people-community-16-filled' TBOXT='Community' />
    <Boxbear icon='majesticons:comment' TBOXT='Comment' />
    <Boxbear icon='ic:round-dashboard' TBOXT='User Data' />
    <Boxbear icon='tdesign:setting-1' TBOXT='Setting' />
  </div> 
    </>
  )
}

export default App
