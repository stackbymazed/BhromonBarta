import React, { use, useEffect, useRef, useState } from 'react';
import { FiMoon, FiSunrise } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Logo from '../../Utilis/Logo/Logo';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const { user, userSignOut } = use(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Successfully signed out!");
        navigate('signIn');
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/community" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
          Community
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/trips" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
          Trips
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50  bg-base-100 shadow-md px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 backdrop-blur-md
">
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
            {links}
          </ul>
        </div>
        <div className='hidden md:block lg:block'>
          <Logo />
        </div>
      </div>

      {/* Center: Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Right: Theme + Auth */}
      <div className="navbar-end space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === 'dark' ? (
            <span className="text-yellow-300 text-xl"><FiSunrise /></span>
          ) : (
            <span className="text-gray-700 text-xl"><FiMoon /></span>
          )}
        </button>

        {/* Auth/Profile */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer"
            >
              <img
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                src={user?.photoURL}
                alt="User"
              />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-2 sm:right-4 mt-3  max-w[350px] sm:max-w-[200px] rounded-xl z-30 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl p-4 space-y-2"
                >
                  <li><li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
                      Dashboard
                    </NavLink>
                  </li></li>
                  <li className="text-base font-semibold break-words">
                    {user?.displayName}
                  </li>
                  <li className="text-base font-semibold break-words">
                    {user?.email}
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full btn btn-outline btn-sm dark:border-white dark:text-white"
                    >
                      Sign Out
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <NavLink to='/signIn'>
              <button className="btn btn-outline btn-sm">Sign In</button>
            </NavLink>
            <NavLink to='/signUp'>
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
