import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Landing from '../pages/shared/Landing';
import NotFound from '../pages/shared/NotFound';
import PublicRoute from './visibility/PublicRoute';
import PrivateRoute from './visibility/PrivateRoute';
import Login from "../pages/shared/Login";
import Home from '../pages/user/Home';
import UserRoute from './role/UserRoute';
import Signup from '../pages/shared/Signup';
import Profile from '../pages/shared/Profile';
import Faq from '../pages/user/Faq';
import Contact from '../pages/user/Contact';
import History from '../pages/user/History';
import Record from '../pages/user/Record';
import DoctorRoute from './role/DoctorRoute';
import Patient from '../pages/doctor/Patient';
import PatientDetail from '../pages/doctor/PatientDetail';
import Analyze from '../pages/doctor/Analyze';

const createRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/',
        element: <DoctorRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to="/patient" />
          },
          {
            path: '/patient',
            element: <Patient />
          },
          {
            path: '/patient/:userId',
            element: <PatientDetail />
          },
          {
            path: '/analyze/:topicId',
            element: <Analyze />
          }
        ]
      },
      {
        path: '/',
        element: <UserRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to="/home" />
          },
          {
            path: '/home',
            element: <Home />
          },
          {
            path: '/record',
            element: <Record />
          },
          {
            path: '/history',
            element: <History />
          },
          {
            path: '/faq',
            element: <Faq />
          },
          {
            path: '/contact',
            element: <Contact />
          }
        ]
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const Router = () => {
  return <RouterProvider router={createRouter} />;
};

export default Router;
