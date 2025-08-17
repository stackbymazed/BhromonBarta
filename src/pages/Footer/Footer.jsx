import React from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
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
      <section className=" bg-blue-500 text-white px-4 py-6">
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
              href="https://github.com/stackbymazed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mazedul-islam22/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/majedulislam.nayem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
          <hr className="w-full border-yellow-400/40 mt-2" />
          {/* Copyright */}
          <p className="text-center text-xs text-yellow-300/90">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
