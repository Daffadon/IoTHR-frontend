import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
const PublicRoute = () => {
  // const { token } = useUserContext();
  // if (token) {
  //   return <Navigate to={'/home'} />;
  // }
  return <Outlet />;
};

export default PublicRoute;
