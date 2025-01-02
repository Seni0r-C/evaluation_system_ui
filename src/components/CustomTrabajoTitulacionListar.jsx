import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import { obtenerEstados } from '../services/trabajosTitulacion';
import FiltroTrabajoTitulacion from './listworks/FiltroTrabajoTitulacion';
import ListaTrabajosTitulacion from './listworks/ListaTrabajosTitulacion';
import Paginacion from './listworks/Paginacion';

const CustomTrabajoTitulacionListar = ({permisosAcciones, includeState=false}) => {
  const [trabajos, setTrabajos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [verTodo, setVerTodo] = useState(false);

  const info = localStorage.getItem('userInfo');
  const user = JSON.parse(info);

  const [filters, setFilters] = useState({
    carrera_id: '',
    modalidad_id: '',
    estado: '',
    titulo: '',
    fecha_defensa: user.roles.includes(3) ? new Date().toISOString().split('T')[0] : '',
  });

  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    obtenerCarreras(setCarreras);
    obtenerEstados(setEstados);
  }, []);

  useEffect(() => {
    if (info) {
      // Lista de roles a verificar
      const requiredRoles = [1, 2];

      // Verificar si el usuario tiene al menos uno de los roles
      const hasRole = user.roles.some(role => requiredRoles.includes(role));

      if (hasRole) {
        setVerTodo(true);
      } else {
        obtenerModalidadesPorCarrera(user.carreras[0], setModalidades);
        setFilters({
          ...filters, carrera_id: user.carreras[0],
        });
      }
    }
  }, []);

  useEffect(() => {
    if (filters.carrera_id) {
      obtenerModalidadesPorCarrera(filters.carrera_id, setModalidades);
    } else if (user.carreras.length > 0) {
      obtenerModalidadesPorCarrera(user.carreras[0], setModalidades);
    }
  }, [filters.carrera_id]);

  // Cargar los trabajos de titulación
  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await axiosInstance.get('/trabajo-titulacion/listar', {
          params: {
            ...filters,
            page,
            limit,
          },
        });

        setTrabajos(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching trabajos:", error);
      }
    };

    fetchTrabajos();
  }, [filters, page, limit]);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trabajos de Titulación</h1>
      {includeState?
      (<FiltroTrabajoTitulacion {...{ filters, onFilterChange: handleFilterChange, carreras, estados, modalidades, verTodo, user }} />)
      :
      (<FiltroTrabajoTitulacion {...{ filters, onFilterChange: handleFilterChange, carreras, modalidades, verTodo, user }} />)
      }
      <ListaTrabajosTitulacion trabajos={trabajos} user={user} permisosAcciones={permisosAcciones} />
      <Paginacion {...{ page, total, limit, onPageChange: setPage, onLimitChange: (e) => setLimit(e.target.value) }} />
    </div>
  );
};

export default CustomTrabajoTitulacionListar;
