import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import "../styles/navigation.css"

const Navigation = () => {
  return (
      <div className="sidebar_container">
        <NavLink to="/" className="logo">
          <div>
            <img src="./RD_white.png" alt="logo" />
          </div>
        </NavLink>
        {/* <NavLink to="/" className="link">
          <p>
            <Icon icon="ic:round-dashboard" className='icon' />
            Dashboard
          </p>
        </NavLink> */}
        <NavLink to="/" className="link">
          <p>
            <Icon icon="radix-icons:dashboard" className='icon' />
            Banner
          </p>
        </NavLink>
        <NavLink to="/books_store" className="link">
          <p>
            <Icon icon="wpf:books" className='icon' />
            Books Store
          </p>
        </NavLink>
        <NavLink to="/community" className="link">
          <p>
            <Icon icon="fluent:people-community-16-filled" className='icon' />
            Community
          </p>
        </NavLink>
        <NavLink to="/user" className="link">
          <p>
            <Icon icon="ic:round-dashboard" className='icon' />
            Role
          </p>
        </NavLink>
        <NavLink to="/setting" className="link">
          <p>
            <Icon icon="tdesign:setting-1" className='icon' />
            Setting
          </p>
        </NavLink>
      </div>
  )
}

export default Navigation