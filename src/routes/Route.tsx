import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import {} from 'react-router-dom';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';

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
        path: 'login/',
        element: <Login />
      }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {}
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
