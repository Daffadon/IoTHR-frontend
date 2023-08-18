import React, { ReactNode } from 'react';
import Navbar from '../appbar/Navbar';

interface GuestLayoutProp {
  children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProp> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default GuestLayout;
