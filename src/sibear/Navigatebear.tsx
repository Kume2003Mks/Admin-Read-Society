
import { Icon } from '@iconify/react';
import {NavLink} from 'react-router-dom'
function Navigatebear() {
  return (
    <div className='bg-[#ffffff] w-[200px] flex flex-col gap-2  '>
        <NavLink to="/">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="ic:round-dashboard" color="#7A7A7A" width="24" height="30" className='mr-2' />
                Dashboard
            </p>
        </NavLink> 
        <NavLink to="/UI-element">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="radix-icons:dashboard" color="#7A7A7A" width="24" height="30" className='mr-2' />
              UI-Element
            </p>
        </NavLink>
        <NavLink to="/Books_Store">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="wpf:books" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Books Store
            </p>
        </NavLink>
        <NavLink to="/AddBook">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="fluent:book-add-24-filled" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Add books
            </p>
        </NavLink>
        <NavLink to="/EditBooks">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="material-symbols:edit" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Edit books
            </p>
        </NavLink>
        <NavLink to="/Community">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="fluent:people-community-16-filled" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Community
            </p>
        </NavLink>
        <NavLink to="/Communt">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="majesticons:comment" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Comment
            </p>
        </NavLink>
        <NavLink to="/UserData">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="ic:round-dashboard" color="#7A7A7A" width="24" height="30" className='mr-2' />
            User Data
            </p>
        </NavLink>
        <NavLink to="/Setting">
            <p className=' flex py-[10px] px-[15px] items-center '>
            <Icon icon="tdesign:setting-1" color="#7A7A7A" width="24" height="30" className='mr-2' />
            Setting
            </p>
        </NavLink>
    </div>
  )
}

export default Navigatebear