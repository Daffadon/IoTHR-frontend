import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const DoctorRoute = () => {
  const { user } = useUserContext();
  if (!user) {
    return
  }
  if (user?.role !== 'doctor') {
    return <Navigate to={'/home'} />;
  }
  return <Outlet />;
};

export default DoctorRoute;
