import React, { use, useEffect, useState } from 'react';
import { FiMoon, FiSun, FiSunrise } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Logo from '../../Utilis/Logo/Logo';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, userSignOut } = use(AuthContext)
  const navigate = useNavigate()

  const [theme, setTheme] = useState('light');

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

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Success SignOut User !!");
        navigate('signIn')
      }).catch((error) => {
        toast.error("Something went wrong");
      });


  }
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : 'text-gray-700'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : 'text-gray-700'
          }
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : 'text-gray-700'
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : 'text-gray-700'
          }
        >
          Trips
        </NavLink>
      </li>
      {
        user && <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-primary font-semibold' : 'text-gray-700'
            }
          >
            Dashboard
          </NavLink>
        </li>
      }
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
       <div className='hidden md:block lg:block'>
         <Logo></Logo>
       </div>

      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Buttons */}
      <div className="navbar-end space-x-2">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className=" p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {
            theme === 'dark' ? (
              <span className="text-yellow-300 text-xl">
                <FiSunrise />
              </span>
            ) : (
              <span className="text-gray-700 text-xl">
                <FiMoon />
              </span>
            )
          }
        </button>
        {
          user ? <>
            <div className="dropdown dropdown-hover ">
              <div tabIndex={0}>
                <img className='w-[40px] h-[40px] rounded-full' src={user?.photoURL} alt="User" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu rounded-box z-10 w-56 p-2 bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm">
                <li className='text-xl font-semibold'>{user?.displayName}</li>
              </ul>
            </div>
            <button onClick={handleSignOut} className="btn btn-outline btn-sm">Sign Out</button>
          </> :
            <>
              <NavLink to='/signIn'>
                <button className="btn btn-outline btn-sm">Sign In</button>
              </NavLink>
              <NavLink to='signUp'>
                <button className="btn btn-primary btn-sm">Sign Up</button>
              </NavLink>
            </>
        }


      </div>
    </div>
  );
};

export default Navbar;
