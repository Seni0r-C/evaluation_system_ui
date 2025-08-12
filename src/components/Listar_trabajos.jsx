/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { permisos } from '../utils/permisos';
import axiosInstance from '../services/axiosConfig';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import { obtenerEstados } from '../services/trabajosTitulacion';
import FiltroTrabajoTitulacion from './lista_trabajos/FiltroTrabajoTitulacion';
import ListaTrabajosTitulacion from './lista_trabajos/ListaTrabajosTitulacion';
import Paginacion from './lista_trabajos/Paginacion';
import PropTypes from 'prop-types';

const CustomTrabajoTitulacionListar = ({
  permisosAcciones,
  includeStateFiltter = false,
  firstStates = [],
  titulo = "Trabajos de Titulación",
  endpoint = 'listar'
}) => {
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
    estado: firstStates || '',
    titulo: '',
    fecha_defensa: user.roles.includes(3) ? new Date().toISOString().split('T')[0] : '',
  });

  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    obtenerCarreras(setCarreras);
    if (firstStates && includeStateFiltter) {
      // if (JSON.stringify(firstStates)!==JSON.stringify(estados) && firstStates && includeStateFiltter) {
      setEstados(firstStates);
    } else if (firstStates === '' && includeStateFiltter) {
      obtenerEstados(setEstados);
    }

  }, [estados]);

  useEffect(() => {
    if (firstStates) {
      setFilters((prevFilters) => ({ ...prevFilters, estado: firstStates }));
      // setFilters((prevFilters) => ({ ...prevFilters, estado: firstStates }));
    }
  }, [firstStates]);

  useEffect(() => {
    if (info) {
      // Lista de roles a verificar
      const requiredRoles = permisos.ROLES_VER_TODOS_LOS_REGISTROS_DE_TRABAJOS;

      // Verificar si el usuario tiene al menos uno de los roles
      const hasRole = user.roles.some(role => requiredRoles.includes(role.nombre));

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

  useEffect(() => {
    if ((firstStates && includeStateFiltter) && !firstStates.includes(filters.estado)) {
      setFilters((prevFilters) => ({ ...prevFilters, estado: firstStates }));
    }
  }, [filters.estado]);


  const fetchTrabajos = async () => {
    try {
      const response = await axiosInstance.get(`/trabajo-titulacion/${endpoint}`, {
        params: {
          ...filters,
          page,
          limit,
          user: { id: user.id, roles: user.roles, name: user.nombre },
        },
      });

      setTrabajos(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching trabajos:", error);
    }
  };

  // Cargar los trabajos de titulación
  useEffect(() => {
    fetchTrabajos();
  }, [filters, page, limit]);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
      {includeStateFiltter ?
        (<FiltroTrabajoTitulacion key={`filtro-${user.id}`} {...{ filters, onFilterChange: handleFilterChange, carreras, estados, modalidades, verTodo, user }} />)
        :
        (<FiltroTrabajoTitulacion key={`filtro-${user.id}`} {...{ filters, onFilterChange: handleFilterChange, carreras, modalidades, verTodo, user }} />)
      }
      <ListaTrabajosTitulacion key={`trabajos-${user.id}`} trabajos={trabajos} user={user} permisosAcciones={permisosAcciones} />
      <Paginacion {...{ page, total, limit, onPageChange: setPage, onLimitChange: (e) => setLimit(e.target.value) }} />
    </div>
  );
};

CustomTrabajoTitulacionListar.propTypes = {
  permisosAcciones: PropTypes.array,
  includeStateFiltter: PropTypes.bool,
  firstStates: PropTypes.array,
  titulo: PropTypes.string,
};

export default CustomTrabajoTitulacionListar;