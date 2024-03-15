import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import customerRoutes from 'app/views/customer/CustomerRoutes';
import businessRoutes from 'app/views/business/BusinessRoutes';
import profileRoutes from 'app/views/profile/ProfileRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import Profile from 'app/views/profile/Analytics';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...customerRoutes,
      ...businessRoutes,
      ...profileRoutes,
      ...materialRoutes,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="customer" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
