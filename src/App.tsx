import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TE from '../src/sidear/T'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <TE/>
    </>
  )
}

export default App
