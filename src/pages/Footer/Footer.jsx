import React from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
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
      <section className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
          </div>

          {/* Short tagline or info */}
          <p className="text-center md:text-left max-w-md">
            Building amazing web experiences with React and Tailwind CSS. Connect with me on socials!
          </p>

          {/* Social icons */}
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/stackbymazed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mazedul-islam22/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/majedulislam.nayem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6 mt-6">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
          <p className="text-center text-xs">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
