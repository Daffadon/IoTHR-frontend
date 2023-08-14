import { ReactNode } from 'react';
import Navbar from '../appbar/Navbar';
const GuestLayout = (children: ReactNode) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default GuestLayout;
