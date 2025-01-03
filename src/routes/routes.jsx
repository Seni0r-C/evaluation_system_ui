import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import ModalidadesTitulacion from '../pages/modalidadesTitulacion';
import ItemsRevista from '../pages/itemsRevista';
import ItemsRubrica from '../pages/itemsRubrica';
import { RutaRaiz } from '../utils/constants';
import Calificar from '../pages/calificar';
import VistaCrearTrabajoTitulacionFormulario from '../pages/VistaCrearTrabajoTitulacionFormulario';
import TrabajoTitulacionListar from '../pages/TrabajoTitulacionListar';
import UserProfile from '../pages/Perfil';
import Home from '../pages/Home';
import CalendarioEventos from '../pages/Calendario';
import CustomTrabajoTitulacionListar from '../components/CustomTrabajoTitulacionListar';
import { estadosTrabajos } from '../utils/estados_trabajos';

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
              firstState={estadosTrabajos.FINALIZADO}
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
              firstState={estadosTrabajos.FINALIZADO}
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
              firstState={estadosTrabajos.REGISTRADO}
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
              firstState={estadosTrabajos.CALIFICADO}
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
