import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js'; // Path ko explicit banaya gaya hai

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const activeLinkStyle = {
    color: '#124170', // Using your brand-dark-blue
    fontWeight: 'bold',
  };

  const authLinks = (
    <div className="relative">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full text-brand-dark-blue font-bold text-lg focus:outline-none focus:ring-2 focus:ring-white">
        {user ? user.name.charAt(0).toUpperCase() : '?'}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
          <NavLink 
            to="/dashboard" 
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            onClick={() => setDropdownOpen(false)}
          >
            Dashboard
          </NavLink>
          <button 
            onClick={onLogout} 
            className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  const guestLinks = (
    <>
      <li>
        <NavLink 
          to="/login" 
          className={({ isActive }) => 
            `transition-colors ${isActive ? 'text-brand-dark-blue font-bold' : 'text-brand-teal hover:text-brand-dark-blue'}`
          }
        >
          Login
        </NavLink>
      </li>
      <li>
        {/* Changed to a regular Link to remove the incorrect active state */}
        <Link 
          to="/signup"
          className="px-4 py-2 rounded-lg shadow-sm font-bold transition-colors bg-brand-green text-white hover:bg-opacity-90"
        >
          Sign Up
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2">
          {/* SVG Leaf Icon has been removed */}
          <h1 className="text-2xl font-bold text-brand-green">
            NutriSync
          </h1>
        </Link>
        <ul className="flex space-x-6 items-center font-medium">
          {user ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

