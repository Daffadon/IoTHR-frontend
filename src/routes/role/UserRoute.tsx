import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const UserRoute = () => {
  const { user } = useUserContext();
  if (user?.role === 'admin') {
    return <Navigate to={'/home'} />;
  }
  return <Outlet />;
};

export default UserRoute;
