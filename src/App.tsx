import './styles/app.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Bookstore from './pages/Bookstore';
import Community from './pages/Community';
import Banner from './pages/Banner';


function App() {

  const Layout = () => {
    return (
      <div className='main_layout'>
        <Navigation />
        <main className='main_container'>
            <Outlet />
        </main>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Banner />,
        }
      ]
    },
    {
      path: "/books_store",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Bookstore />,
        }
      ]
    },
    {
      path: "/community",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Community />,
        }
      ]
    },
    {
      path: "/user",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <div />,
        }
      ]
    },
    {
      path: "/setting",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <div />,
        }
      ]
    }

  ])


  return (
    <RouterProvider router={router} />
  )
}

export default App
