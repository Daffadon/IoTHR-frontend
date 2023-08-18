import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const AdminRoute = () => {
  // const { user } = useUserContext();
  // if (user?.role === 'user') {
  //   return <Navigate to={'/home'} />;
  // }
  return <Outlet />;
};

export default AdminRoute;
