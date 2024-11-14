import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../presentation/components/ErrorBoundary';
import Login from '../presentation/pages/login';
import NotFound from '../presentation/pages/not_found';
import Layout from '../presentation/layout/Layout';
import ProtectedRoute from '../domain/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    ),
  },
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <h1>Hello Vite!</h1>
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
]);

export default router;
