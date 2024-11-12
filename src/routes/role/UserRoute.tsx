import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const UserRoute = () => {
  const { user } = useUserContext()
  if (!user) {
    return
  }
  if (user?.role !== 'user') {
    return <Navigate to={'/patient'} />;
  }
  return <Outlet />;
};

export default UserRoute;
