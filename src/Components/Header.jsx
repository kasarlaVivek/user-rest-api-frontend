import React from 'react';
import { NavLink } from 'react-router';

function Header() {
  return (
    <nav className='navbar'>
        <div className='nav-brand'>
          <img className='nav-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0QBMhdvy8Fsl40OmNhbNwJLxS-TiLHKETA&s" alt="Logo" />
        </div>
        <ul className='nav-links'>
            <li>
            <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
            </li>
            <li>
            <NavLink to="/users-list" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Users List</NavLink>
            </li>
            <li>
            <NavLink to="/add-user" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>Add User</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Header;