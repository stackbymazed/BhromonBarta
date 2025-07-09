import React from 'react';
import Navbar from '../../pages/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../pages/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-96 max-w-[1400px] mx-auto'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;