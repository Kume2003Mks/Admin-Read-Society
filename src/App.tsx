import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'


import THome from './pages/THome.tsx'
import Ui_element from './pages/Ui-element.tsx'
import Books_Stoer from './pages/Books Stoer.tsx'
import AddBooks from './pages/AddBooks.tsx'
import EditBooks from './pages/EditBooks.tsx'
import Community from './pages/Community.tsx'
import Communt from './pages/Communt.tsx'
import UserData from './pages/UserData.tsx'
import Setting from './pages/Setting.tsx'
const router = createBrowserRouter([
  {
    path : "/",
    element : <THome/>
  },
  {
    path : "/UI-Element",
    element : <Ui_element/>
  },
  {
    path : "/Books_Store",
    element : <Books_Stoer/>
  },
  {
    path : "/AddBook",
    element : <AddBooks/>
  },
  {
    path : "/EditBooks",
    element : <EditBooks/>
  },
  {
    path : "/Community",
    element : <Community/>
  },
  {
    path : "/Communt",
    element : <Communt/>
  },
  {
    path : "/UserData",
    element : <UserData/>
  },
  {
    path : "/Setting",
    element : <Setting/>
  }

])
function lout(){
  return ( 
  <>
  
  </>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return ( <RouterProvider router={router}/>

  )
}

export default App
