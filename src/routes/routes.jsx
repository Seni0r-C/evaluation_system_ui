import { createBrowserRouter } from 'react-router-dom';
import { RutaRaiz } from '../utils/constants';

// Componentes compartidos
import ErrorBoundary from '../components/shared/ErrorBoundary';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import CustomTrabajoTitulacionListar from '../components/CustomTrabajoTitulacionListar';

// Páginas
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ModalidadesTitulacion from '../pages/modalidadesTitulacion';
import ItemsRevista from '../pages/itemsRevista';
import ItemsRubrica from '../pages/itemsRubrica';
import Calificar from '../pages/calificar';
import TrabajoTitulacionListar from '../pages/TrabajoTitulacionListar';
import UserProfile from '../pages/Perfil';
import Home from '../pages/Home';
import CalendarioEventos from '../pages/Calendario';
import TrabajoTitulacionCrear from '../pages/TrabajoTitulacionCrear';

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
    path: RutaRaiz,
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/trabajos-titulacion',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <TrabajoTitulacionListar />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calendario',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CalendarioEventos />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/modalidades',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <ModalidadesTitulacion />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/items-revista',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <ItemsRevista />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/items-rubrica',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <ItemsRubrica />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/registro-anteproyecto',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <TrabajoTitulacionCrear />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calificacion-de-trabajo-titulacion',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'calificar',
              ]}
              firstStates={["CON TRIBUNAL"]}
            />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/trabajos-titulacion-realizados',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
              ]}
              firstStates={["DEFENDIDO"]}
            />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calificar',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <Calificar />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/asignacion-de-tribunal',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'asignarTribunal',
              ]}
              includeStateFiltter={true}
              firstStates={["SIN TRIBUNAL"]}
            />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/generacion-de-documento',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'generarReporte',
              ]}
              firstStates={["DEFENDIDO"]}
            />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/profile',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        </Layout>
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
  }
];

const router = createBrowserRouter(routes);

export default router;
