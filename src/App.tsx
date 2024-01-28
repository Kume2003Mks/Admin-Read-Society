import './styles/app.css'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Bookstore from './pages/Bookstore';
import Community from './pages/Community';
import Banner from './pages/Banner';
import LoginPage from './pages/LoginPage';
import { ProtectRouteProps } from './function/DeclareType';
import { useAuth } from './function/AuthContext';


function App() {

  const { isLoggedIn } = useAuth();

  const ProtectRoute: React.FC<ProtectRouteProps> = ({ user, children }) => {
    return user ? children : <Navigate to='/login' />;
  }

  const Layout = () => {
    return (
      <ProtectRoute user={isLoggedIn}>
        <div className='main_layout'>
          <Navigation />
          <main className='main_container'>
            <Outlet />
          </main>
        </div>
      </ProtectRoute>
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
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

  ])


  return (
    <RouterProvider router={router} />
  )
}

export default App
