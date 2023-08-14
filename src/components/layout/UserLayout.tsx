import { ReactNode, useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import { axiosClient } from '../../lib/axios-client';
import Navbar from '../appbar/Navbar';

const UserLayout = (children: ReactNode) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axiosClient.get('/user');
      setUser(data);
    };
    getUserData();
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
