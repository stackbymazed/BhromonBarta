import React from 'react';
import { NavLink } from 'react-router';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from '../../Utilis/Logo/Logo';

const Footer = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/community', label: 'Community' },
    { to: '/about', label: 'About Us' },
    { to: '/trips', label: 'Trips' },
  ];

  return (
    <>
      {/* Top section above footer */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-600 text-white px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
            <h2 className="text-2xl font-bold tracking-wide">YourBrand</h2>
          </div>

          {/* Short tagline or info */}
          <p className="text-center md:text-left max-w-md">
            Building amazing web experiences with React and Tailwind CSS. Connect with me on socials!
          </p>

          {/* Social icons */}
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </section>

      {/* Actual footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-gray-100 dark:text-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-5 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-300 underline'
                    : 'hover:text-yellow-300 transition-colors duration-300'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <hr className="w-full border-yellow-400/40" />

          {/* Copyright */}
          <p className="text-center text-xs text-yellow-300/90">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
