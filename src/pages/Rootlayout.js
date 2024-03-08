import React from 'react'
import { NavLink,Outlet } from 'react-router-dom';
import '/Users/testuser/Desktop/Saurav/reactjs/task/taskapi/src/css/Regcss.css';

export default function Rootlayout() {
  return (
    <div className='root-layout'>
       <header>
      <nav>
         <NavLink to="/">Registration</NavLink>
         <NavLink to="login">Login</NavLink>
         <NavLink to="Posts">Posts</NavLink>
         </nav>
    </header>
    <main>

        <Outlet />
    </main>
    </div>
  )
}
