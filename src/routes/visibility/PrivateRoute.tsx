// import { Navigate, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { token } = useUserContext();
  if (token !== import.meta.env.VITE_APP_TOKEN) {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
