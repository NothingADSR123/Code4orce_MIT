import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Code4orce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            <Link to="/insights" className="text-gray-600 hover:text-blue-600">Insights</Link>
            <Link to="/goals" className="text-gray-600 hover:text-blue-600">Goals</Link>
            <Link to="/settings" className="text-gray-600 hover:text-blue-600">Settings</Link>
          </div>

          {/* Profile Icon */}
          <div className="hidden md:flex items-center">
            <FaUserCircle className="h-8 w-8 text-gray-600 hover:text-blue-600 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/dashboard" className="block text-gray-600 hover:text-blue-600 py-2">Dashboard</Link>
              <Link to="/insights" className="block text-gray-600 hover:text-blue-600 py-2">Insights</Link>
              <Link to="/goals" className="block text-gray-600 hover:text-blue-600 py-2">Goals</Link>
              <Link to="/settings" className="block text-gray-600 hover:text-blue-600 py-2">Settings</Link>
              <div className="py-2">
                <FaUserCircle className="h-8 w-8 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;