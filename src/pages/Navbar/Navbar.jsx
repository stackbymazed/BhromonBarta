import React, { useEffect, useRef, useState, useContext } from 'react';
import { FiMoon, FiSunrise } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Logo from '../../Utilis/Logo/Logo';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation or outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen && 
        !event.target.closest('.mobile-menu-container') && 
        !event.target.closest('.mobile-menu-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

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
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-white dark:text-gray-200'}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/community" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-white dark:text-gray-200'}>
          Community
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-white dark:text-gray-200'}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/trips" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-white dark:text-gray-200'}>
          Trips
        </NavLink>
      </li>
      <li>
        <NavLink to="/guides-profile" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-white dark:text-gray-200'}>
          Guide Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div
  className={`
    navbar sticky  top-0 z-50 w-full lg:px-20 md:px-12 px-6 backdrop-blur-md shadow-md flex items-center justify-between
    ${theme === 'dark' ? 'bg-blue-500  text-white' : ' bg-blue-500 text-white'}
  `}
>
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button btn btn-ghost p-2 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.ul
                key="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mobile-menu-container absolute top-full left-0 mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md shadow-lg w-52 p-3 z-40"
              >
                {React.Children.map(links.props.children, (child, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 border-b border-white last:border-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <div className="hidden md:block lg:block">
          <Logo />
        </div>
      </div>

      {/* Center: Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {React.Children.map(links.props.children, (child, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              {child}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right: Theme + Auth */}
      <div className="navbar-end flex items-center space-x-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <AnimatePresence exitBeforeEnter>
            {theme === 'dark' ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="text-yellow-300 text-xl"
              >
                <FiSunrise />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 text-xl"
              >
                <FiMoon />
              </motion.span>
            )}
          </AnimatePresence>
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
                  className="absolute top-full right-2 sm:right-4 mt-3 max-w-[200px] rounded-xl z-30 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl p-4 space-y-2"
                >

                  <li className="text-base font-semibold break-words ">
                    {user?.displayName}
                  </li>
                  <li className="text-base font-semibold break-words">
                    {user?.email}
                  </li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 rounded-sm px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-white'}>
                      Dashboard
                    </NavLink>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 rounded-sm"
                  >
                    <button
                      onClick={handleSignOut}
                      className="w-full btn btn-outline btn-sm dark:border-white dark:text-white"
                    >
                      Sign Out
                    </button>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <NavLink to='/signIn'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-sm"
              >
                Sign In
              </motion.button>
            </NavLink>
            <NavLink to='/signUp'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-sm"
              >
                Sign Up
              </motion.button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;



