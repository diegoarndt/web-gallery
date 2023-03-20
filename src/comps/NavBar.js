// src/comps/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.scss';

const NavBar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/signin');
  };

  return (
    // nav bar with a brand name and a sign out button
    <nav className='nav-bar'>
      <span className='nav-brand'>AKK Web Gallery</span>
      <div className='nav-links'>
        <button className='btn-sign-out' onClick={handleLogoutClick}>
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
