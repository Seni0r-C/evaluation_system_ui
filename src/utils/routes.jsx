import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../presentation/components/ErrorBoundary';
import Login from '../presentation/pages/login';
import NotFound from '../presentation/pages/not_found';
import Layout from '../presentation/layout/Layout';
import ProtectedRoute from '../domain/ProtectedRoute';
import Principal from '../presentation/pages/principal';
import ModalidadesTitulacion from '../presentation/pages/modalidadesTitulacion';

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
            <Principal />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/modalidades',
    element: (
      <ErrorBoundary>
        {/* <ProtectedRoute> */}
          <Layout>
            <ModalidadesTitulacion />
          </Layout>
        {/* </ProtectedRoute> */}
      </ErrorBoundary>
    ),
  },
]);

export default router;
