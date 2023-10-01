import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import PublicRoute from './visibility/PublicRoute';
import PrivateRoute from './visibility/PrivateRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AdminRoute from './role/AdminRoute';
import UserRoute from './role/UserRoute';
import Admin from '../pages/Admin';
import User from '../pages/User';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Analysis from '../pages/Analysis';

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
        path: '/',
        element: <AdminRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to="/admin" />
          },
          {
            path: '/admin',
            element: <Admin />
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
            path: '/user',
            element: <User />
          },
          {
            path: '/home',
            element: <Home />
          },
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/analysis',
            element: <Analysis />
          }
        ]
      }
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
