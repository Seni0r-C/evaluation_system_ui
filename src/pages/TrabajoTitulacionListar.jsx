/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import { obtenerEstados } from '../services/trabajosTitulacion';
import { FaCalendarDay, FaChevronLeft, FaChevronRight, FaEdit } from 'react-icons/fa';
import { MdChecklist } from 'react-icons/md';
import BotonAccion from '../components/common/BotonAccion';
import InputField from '../components/common/InputField';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../utils/constants';

const TrabajoTitulacionListar = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [verTodo, setVerTodo] = useState(false);

  const info = localStorage.getItem('userInfo');
  const user = JSON.parse(info);

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    carrera_id: '',
    modalidad_id: '',
    estado: '',
    titulo: '',
    fecha_defensa: user.roles.includes(3) ? new Date().toISOString().split('T')[0] : '',
  });

  //datos
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const colorMap = {
    Aprobado: 'bg-green-100 text-green-800',
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Rechazado: 'bg-red-100 text-red-800',
    Registrado: 'bg-blue-100 text-blue-800',

    // Agrega más estados y colores aquí según sea necesario
  };

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

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de límite de trabajos por página
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1); // Resetear a la primera página cuando cambie el límite
  };

  const handleEdit = (trabajo) => {
    // setEditTrabajo(trabajo);
    // setModalEditTrabajo(true);
    console.log(trabajo);
  };

  const handleAsignarFecha = (trabajo) => {
    // setAsignarFecha(trabajo);
    // setModalAsignarFecha(true);
    console.log(trabajo);
  };

  const handleCalificar = (trabajo) => {
    navigate("/calificar", { state: { trabajo } });
  };

  const acciones = [
    {
      roles: [1, 2],
      permiso: 'editar',
      icono: FaEdit,
      variant: 'secondary',
      tooltip: 'Editar',
      onClick: handleEdit,
    },
    {
      roles: [1, 2],
      permiso: 'asignarFecha',
      icono: FaCalendarDay,
      variant: 'primary',
      tooltip: 'Asignar Fecha',
      onClick: handleAsignarFecha,
    },
    {
      roles: [1, 3],
      permiso: 'calificar',
      icono: MdChecklist,
      variant: 'primary',
      tooltip: 'Calificar',
      onClick: handleCalificar,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trabajos de Titulación</h1>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputField
          label="Título"
          name="titulo"
          value={filters.titulo}
          onChange={handleFilterChange}
          placeholder="Filtrar por título"
        />

        {verTodo && (
          <InputField
            label="Carrera"
            type="select"
            name="carrera_id"
            value={filters.carrera_id}
            onChange={handleFilterChange}
            options={carreras.filter(carrera =>
              user.carreras.includes(carrera.id) || verTodo
            )}
            placeholder="Seleccione una carrera"
            capitalize
          />
        )}

        <InputField
          label="Fecha defensa"
          type="date"
          name="fecha_defensa"
          value={filters.fecha_defensa}
          onChange={handleFilterChange}
        />

        <InputField
          label="Modalidad"
          type="select"
          name="modalidad_id"
          value={filters.modalidad_id}
          onChange={handleFilterChange}
          options={modalidades}
          placeholder="Seleccione una modalidad"
        />

        <InputField
          label="Estados"
          type="select"
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
          options={estados}
          placeholder="Seleccione un estado"
        />
      </div>

      {/* Lista de trabajos */}
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            {['Título', 'Carrera', 'Link', 'Modalidad', 'Estado', 'Acciones'].map((header) => (
              <th key={header} className="border-b px-6 py-3 font-bold text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trabajos.length > 0 ? (
            trabajos.map((trabajo) => (
              <tr key={trabajo.id} className="hover:bg-gray-100 transition-colors">
                {[
                  { content: trabajo.titulo },
                  { content: capitalizeWords(trabajo.carrera) },
                  {
                    content: (
                      <a
                        href={trabajo.link_archivo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-700 hover:underline font-normal"
                      >
                        <i className="fas fa-link"></i> Ver archivo
                      </a>
                    ),
                  },
                  { content: trabajo.modalidad },
                  {
                    content: (
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${colorMap[trabajo.estado] || 'bg-gray-200 text-gray-800'
                          }`}
                      >
                        {trabajo.estado}
                      </span>
                    ),
                  },
                  {
                    content: (
                      <div className="flex justify-end gap-4">
                        {acciones.map(({ roles, permiso, icono, variant, tooltip, onClick }) =>
                          roles.some((role) => user.roles.includes(role)) ? (
                            <BotonAccion
                              key={permiso}
                              onClick={() => onClick(trabajo)}
                              icono={icono}
                              variant={variant}
                              tooltip={tooltip}
                            />
                          ) : null
                        )}
                      </div>
                    ),
                  },
                ].map((column, index) => (
                  <td key={index} className="px-6 py-4">
                    {column.content}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500">
                <i className="fas fa-folder-open text-2xl"></i>
                <p>No se encontraron trabajos</p>
              </td>
            </tr>
          )}
        </tbody>

      </table>


      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Mostrar</label>
          <select value={limit} onChange={handleLimitChange} className="p-2 border rounded">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="ml-2">trabajos por página</span>
        </div>
        <div className='flex items-center gap-2'>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <FaChevronLeft />
            Anterior
          </button>
          <span className="mx-4">
            Pag. {page} de {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page * limit >= total}
            onClick={() => handlePageChange(page + 1)}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300 flex items-center gap-2 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            Siguiente
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrabajoTitulacionListar;