import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="h-16 w-screen bg-blue-400">
     
            
         
      <ul className="flex justify-evenly font-semibold text-xl items-center h-full">
      <h1 className=' font-extrabold'>Dashboard</h1>
        <li>
          <NavLink
            to="/viewAppointment"
            className={({ isActive }) =>
              isActive ? '' : 'text-black'
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/viewAppointment"
            className={({ isActive }) =>
              isActive ? 'text-white underline' : 'text-black'
            }
          >
            Appointments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addDoctor"
            className={({ isActive }) =>
              isActive ? 'text-white underline' : 'text-black'
            }
          >
            Add Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addDoctor"
            className={({ isActive }) =>
              isActive ? '' : 'text-black'
            }
          >
            Add Service
          </NavLink>
        </li>
      
      </ul>
    </div>
  );
}

export default Header;
