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
    <nav className='nav-bar'>
      <span className='nav-brand'>Web Gallery</span>
      <div className='nav-links'>
        <button className='btn-sign-out' onClick={handleLogoutClick}>
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
