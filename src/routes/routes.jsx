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
import TrabajoAnteproyectoCrear from '../pages/trabajos/TrabajoAnteproyectoCrear';
import AdministrarCarreras from '../pages/admin/Carreras';
import AdminRutas from '../pages/Admin/Rutas';
import AdminMenu from '../pages/Admin/AdminMenu';
import VerCalificar from '../pages/trabajos/VerCalificar';
import RolesPermisosManager from '../pages/Admin/RolesPermisosManager';
import UserPermissions from '../pages/admin/UserPermissions';
// import ReportsPage from '../pages/Reportes';

export const routes = [
  {
    path: '/login',
    element: (
      <Login />
    ),
  },
  {
    path: '*',
    element: (
      <NotFound />
    ),
  },
  {
    path: baseRoute,
    element: (
      <Layout>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/carreras',
    element: (
      <Layout>
        <ProtectedRoute>
          <AdministrarCarreras />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/rutas',
    element: (
      <Layout>
        <ProtectedRoute>
          <AdminRutas />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/menu',
    element: (
      <Layout>
        <ProtectedRoute>
          <AdminMenu permissionId="ver_panel_admin_fallback" />
          {/* <AdminMenu />  */}
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/modalidades',
    element: (
      <Layout>
        <ProtectedRoute>
          <Modalidades />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/items-rubrica',
    element: (
      <Layout>
        <ProtectedRoute>
          <ItemsRubrica />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/gestion-roles',
    element: (
      <Layout>
        <ProtectedRoute>
        <RolesPermisosManager />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/user-permissions',
    element: (
      <Layout>
        <ProtectedRoute>
          <UserPermissions />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/registro-anteproyecto',
    element: (
      <Layout>
        <ProtectedRoute>
          <TrabajoAnteproyectoCrear />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/registro-trabajo-final',
    element: (
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
    ),
  },
  {
    path: '/calificacion-de-trabajo-titulacion',
    element: (
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
    ),
  },
  {
    path: '/ver-calificacion-de-trabajo-titulacion',
    element: (
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
    ),
  },
  {
    path: '/trabajos-titulacion-realizados',
    element: (
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
    ),
  },
  {
    path: '/calificar',
    element: (
      <Layout>
        <ProtectedRoute>
          <Calificar />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/ver-calificar',
    element: (
      <Layout>
        <ProtectedRoute>
          <VerCalificar />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/asignacion-de-tribunal',
    element: (
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
    ),
  },
  {
    path: '/generacion-de-documento',
    element: (
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
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <NotFound />
    ),
  }
];


let element = null;

for (let i = 0; i < routes.length; i++) {
  element = routes[i].element
  element = (
    <ErrorBoundary>
        {element}
    </ErrorBoundary>
  )
  routes[i].element = element;
}


const router = createBrowserRouter(routes);

export default router;
