import { createBrowserRouter } from 'react-router-dom';
import { RutaRaiz } from '../utils/constants';
import { estadosTrabajos } from '../utils/estados_trabajos';

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
import VistaCrearTrabajoTitulacionFormulario from '../pages/VistaCrearTrabajoTitulacionFormulario';
import TrabajoTitulacionListar from '../pages/TrabajoTitulacionListar';
import UserProfile from '../pages/Perfil';
import Home from '../pages/Home';
import CalendarioEventos from '../pages/Calendario';

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
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/trabajos-titulacion',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <TrabajoTitulacionListar />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calendario',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <CalendarioEventos />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/modalidades',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <ModalidadesTitulacion />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/items-revista',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <ItemsRevista />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/items-rubrica',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <ItemsRubrica />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/registro-proyecto-titulacion',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <VistaCrearTrabajoTitulacionFormulario />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calificacion-de-trabajo-titulacion',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'calificar',
              ]}
              firstStates={[estadosTrabajos.ASIGNADO]}
            />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/trabajos-titulacion-realizados',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
              ]}
              firstStates={[estadosTrabajos.FINALIZADO]}
            />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/calificar',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <Calificar />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/asignacion-de-tribunal',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'asignarTribunal',
              ]}
              includeStateFiltter={true}
              firstStates={[estadosTrabajos.REGISTRADO, estadosTrabajos.ASIGNADO]}
            />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/generacion-de-documento',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <CustomTrabajoTitulacionListar
              permisosAcciones={[
                'detallesTrabajo',
                'generarReporte',
              ]}
              firstStates={[estadosTrabajos.CALIFICADO]}
            />
          </Layout>
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  {
    path: '/profile',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout>
            <UserProfile />
          </Layout>
        </ProtectedRoute>
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
