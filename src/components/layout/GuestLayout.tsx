import React, { ReactNode } from 'react';
import Navbar from '../appbar/Navbar';
import Footer from '../appbar/Footer';

interface GuestLayoutProp {
  children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProp> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default GuestLayout;
