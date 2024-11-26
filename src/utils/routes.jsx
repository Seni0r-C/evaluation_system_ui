import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../presentation/components/ErrorBoundary';
import Login from '../presentation/pages/login';
import NotFound from '../presentation/pages/not_found';
import Layout from '../presentation/layout/Layout';
import ProtectedRoute from '../domain/ProtectedRoute';
import Principal from '../presentation/pages/principal';
import ModalidadesTitulacion from '../presentation/pages/modalidadesTitulacion';
import ItemsRevista from '../presentation/pages/itemsRevista';
import ItemsRubrica from '../presentation/pages/itemsRubrica';
import RegistroTrabajosTitulacion from '../presentation/pages/registroTrabajosTitulacion';
import AsignacionTribunal from '../presentation/pages/asignacionTribunal';
import EvaluacionTesis from '../presentation/pages/evaluacionTesis';
import EvaluacionArticulo from '../presentation/pages/evaluacionArticulo';

import { subRuta } from './constants';

const routes = [
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
  {
    path: '/items-revista',
    element: (
      <ErrorBoundary>
        {/* <ProtectedRoute> */}
        <Layout>
          <ItemsRevista />
        </Layout>
        {/* </ProtectedRoute> */}
      </ErrorBoundary>
    ),
  },
  {
    path: '/items-rubrica',
    element: (
      <ErrorBoundary>
        {/* <ProtectedRoute> */}
        <Layout>
          <ItemsRubrica />
        </Layout>
        {/* </ProtectedRoute> */}
      </ErrorBoundary>
    ),
  },
  {
    path: '/registro-proyecto-titulacion',
    element: (
      <ErrorBoundary>
        {/* <ProtectedRoute> */}
        <Layout>
          <RegistroTrabajosTitulacion />
        </Layout>
        {/* </ProtectedRoute> */}
      </ErrorBoundary>
    ),
  },
  {
    path: '/asignacion-tribunal',
    element: (
      <ErrorBoundary>
        {/* <ProtectedRoute> */}
        <Layout>
          <AsignacionTribunal />
        </Layout>
        {/* </ProtectedRoute> */}
      </ErrorBoundary>
    ),
  },
];

// Agregar prefijo a cada ruta
let prefixedRoutes = routes.map((route) => ({
  ...route,
  path: subRuta + route.path,
}));

prefixedRoutes = [...prefixedRoutes, {
  path: '*',
  element: (
    <ErrorBoundary>
      <NotFound />
    </ErrorBoundary>
  ),
},];
const router = createBrowserRouter(prefixedRoutes);

export default router;
