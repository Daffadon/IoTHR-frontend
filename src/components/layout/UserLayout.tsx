import { ReactNode } from 'react';
import Sidebar from '../appbar/Sidebar';

interface UserLayoutType {
  children: ReactNode;
  record?: boolean
}

const UserLayout: React.FC<UserLayoutType> = ({ children, record }) => {
  return (
    <div className="flex w-full min-h-screen">
      {!record ?
        <Sidebar classname='z-0' />
        :
        <Sidebar />
      }
      <div className="w-5/6 min-h-[100vh] relative">{children}</div>
    </div>
  );
};

export default UserLayout;
