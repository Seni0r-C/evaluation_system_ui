import { createBrowserRouter } from 'react-router-dom';
import { baseRoute } from '../utils/constants';

// Componentes compartidos
import ErrorBoundary from '../components/shared/ErrorBoundary';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/shared/ProtectedRoute';
import CustomTrabajoTitulacionListar from '../components/Listar_trabajos';

// Páginas
import Login from '../pages/usuario/Login';
import NotFound from '../pages/usuario/NotFound';
import Modalidades from '../pages/admin/ModalidadesTitulacion';
import ItemsRubrica from '../pages/admin/ItemsRubrica';
import Calificar from '../pages/trabajos/Calificar';
import UserProfile from '../pages/usuario/Perfil';
import Home from '../pages/usuario/Home';
import CalendarioEventos from '../pages/usuario/Calendario';
import TrabajoAnteproyectoCrear from '../pages/trabajos/TrabajoAnteproyectoCrear';
import AdministrarCarreras from '../pages/admin/Carreras';
import AdminRutas from '../pages/admin/Rutas';
import AdminMenu from '../pages/admin/AdminMenu';
import VerCalificar from '../pages/trabajos/VerCalificar';
// import ReportsPage from '../pages/Reportes';

export const routes = [
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
    path: baseRoute,
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
    path: '/carreras',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <AdministrarCarreras />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/rutas',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <AdminRutas />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/menu',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <AdminMenu />
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
            <Modalidades />
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
            <TrabajoAnteproyectoCrear />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/registro-trabajo-final',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              titulo="Registro de Trabajo Final"
              permisosAcciones={[
                'detallesTrabajo',
                'subirTrabajoFinal',
              ]}
              includeStateFiltter={false}
              firstStates={["ANTEPROYECTO"]}
            />
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
              key="Calificación de Trabajo Titulación"
              titulo="Calificación de Trabajo Titulación"
              permisosAcciones={[
                'detallesTrabajo',
                'calificar',
              ]}
              firstStates={["CON TRIBUNAL", "DEFENDIDO"]}
              endpoint='listar-tri'
              includeStateFiltter={true}
            />
          </ProtectedRoute>
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '/ver-calificacion-de-trabajo-titulacion',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <CustomTrabajoTitulacionListar
              key="Ver Calificación de Trabajo Titulación"
              titulo="Ver Calificación de Trabajo Titulación"
              permisosAcciones={[
                'detallesTrabajo',
                'verCalificarMiembrosTribunal',
              ]}
              firstStates={["CON TRIBUNAL", "DEFENDIDO"]}
              // endpoint='listar-tri'
              includeStateFiltter={true}
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
              titulo="Trabajos Titulación Defendidos"
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
    path: '/ver-calificar',
    element: (
      <ErrorBoundary>
        <Layout>
          <ProtectedRoute>
            <VerCalificar />
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
              key="Asignación de Tribunal y fecha de Defensa"
              titulo="Asignación de Tribunal y fecha de Defensa"
              permisosAcciones={[
                'detallesTrabajo',
                'asignarTribunal',
              ]}
              includeStateFiltter={true}
              firstStates={["SIN TRIBUNAL", "CON TRIBUNAL"]}
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
              key="Generación de Documentos"
              titulo="Generación de Documentos"
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
  // {
  //   path: '/reportes',
  //   element: (
  //     <ErrorBoundary>
  //       <Layout>
  //         <ProtectedRoute>
  //           <ReportsPage />
  //         </ProtectedRoute>
  //       </Layout>
  //     </ErrorBoundary>
  //   ),
  // },
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
