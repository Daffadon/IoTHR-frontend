import { ReactNode, useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import { axiosClient } from '../../lib/axios-client';
import Sidebar from '../appbar/Sidebar';

interface UserLayoutType {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutType> = ({ children }) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axiosClient.get('/user');
      setUser(data);
    };
    getUserData();
  }, []);
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="w-5/6 min-h-[100vh]">{children}</div>
    </div>
  );
};

export default UserLayout;
