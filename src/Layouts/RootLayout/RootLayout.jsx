import React, { useState } from 'react';
import Navbar from '../../pages/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../../pages/Footer/Footer';

const RootLayout = () => {
  const location = useLocation();

  // 👉 শুধু Home page এ hero mode
  const isHome = location.pathname === "/";

  return (
    <div>
      <Navbar isHero={isHome} />
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
