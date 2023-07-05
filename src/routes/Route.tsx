import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
      }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/admin',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin',
            element: <Admin />
          },
          {}
        ]
      },
      {
        path: '/user',
        element: <UserRoute />,
        children: [
          {
            path: '/user',
            element: <User />
          },
          {}
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
