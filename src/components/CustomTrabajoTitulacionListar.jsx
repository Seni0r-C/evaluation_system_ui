import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import { obtenerEstados } from '../services/trabajosTitulacion';
import FiltroTrabajoTitulacion from './listworks/FiltroTrabajoTitulacion';
import ListaTrabajosTitulacion from './listworks/ListaTrabajosTitulacion';
import Paginacion from './listworks/Paginacion';
// import BotonAccion from '../common/BotonAccion';

const CustomTrabajoTitulacionListar = () => {
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
    if (filters.carrera_id) {
      obtenerModalidadesPorCarrera(filters.carrera_id, setModalidades);
    }
  }, [filters.carrera_id]);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await axiosInstance.get('/trabajo-titulacion/listar', {
          params: { ...filters, page, limit },
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
      <FiltroTrabajoTitulacion {...{ filters, onFilterChange: handleFilterChange, carreras, modalidades, estados, verTodo, user }} />
      <ListaTrabajosTitulacion trabajos={trabajos} user={user} acciones={[]} />
      <Paginacion {...{ page, total, limit, onPageChange: setPage, onLimitChange: (e) => setLimit(e.target.value) }} />
    </div>
  );
};

export default CustomTrabajoTitulacionListar;
