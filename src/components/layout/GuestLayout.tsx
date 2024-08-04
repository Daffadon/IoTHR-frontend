import React, { ReactNode } from 'react';
import Navbar from '../appbar/Navbar';
import Footer from '../appbar/Footer';
import { ToastContainer } from 'react-toastify';

interface GuestLayoutProp {
  children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProp> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ToastContainer className="z-10" />
    </>
  );
};

export default GuestLayout;
