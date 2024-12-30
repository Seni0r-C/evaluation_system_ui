/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import { obtenerEstados } from '../services/trabajosTitulacion';
import { FaCalendarDay, FaEdit } from 'react-icons/fa';

const TrabajoTitulacionListar = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [verTodo, setVerTodo] = useState(false);
  const [filters, setFilters] = useState({
    carrera_id: '',
    modalidad_id: '',
    estado: '',
    titulo: ''
  });
  const info = localStorage.getItem('userInfo');
  const user = JSON.parse(info);

  //datos
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const colorMap = {
    Aprobado: 'bg-green-100 text-green-800',
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Rechazado: 'bg-red-100 text-red-800',
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
          carrera_id: user.carreras[0],
          modalidad_id: '',
          estado: '',
          titulo: ''
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trabajos de Titulación</h1>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input
            type="text"
            name="titulo"
            value={filters.titulo}
            onChange={handleFilterChange}
            placeholder="Filtrar por título"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {verTodo && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
            <select
              value={filters.carrera_id}
              name="carrera_id"
              onChange={handleFilterChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccione una carrera</option>
              {carreras.filter(carrera =>
                (user.carreras.includes(carrera.id)
                  && !verTodo
                ) || (verTodo)
              ).map(carrera => (
                <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
          <select
            value={filters.modalidad_id}
            name="modalidad_id"
            onChange={handleFilterChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccione una carrera</option>
            {modalidades.map(modalidad => (
              <option key={modalidad.id} value={modalidad.id}>{modalidad.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Estados</label>
          <select
            value={filters.estado}
            name="estado"
            onChange={handleFilterChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccione un estado</option>
            {estados.map((estado, index) => (
              <option key={index} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de trabajos */}
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            <th className="border-b px-6 py-3 font-bold text-left">Título</th>
            <th className="border-b px-6 py-3 font-bold text-left">Carrera</th>
            <th className="border-b px-6 py-3 font-bold text-left">Link</th>
            <th className="border-b px-6 py-3 font-bold text-left">Modalidad</th>
            <th className="border-b px-6 py-3 font-bold text-left">Estado</th>
            <th className="border-b px-6 py-3 font-bold text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajos.length > 0 ? (
            trabajos.map((trabajo) => (
              <tr key={trabajo.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4">{trabajo.titulo}</td>
                <td className="px-6 py-4">{trabajo.carrera}</td>
                <td className="px-6 py-4">
                  <a
                    href={trabajo.link_archivo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-700 hover:underline font-normal"
                  >
                    <i className="fas fa-link"></i> Ver archivo
                  </a>
                </td>
                <td className="px-6 py-4">{trabajo.modalidad}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${colorMap[trabajo.estado] || 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {trabajo.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(trabajo)}
                      className="p-2 bg-gray-300 text-[#4c4c4a] rounded transition duration-300 transform hover:scale-110"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleAsignarFecha(trabajo)}
                      className="p-2 bg-[#f8cf12] text-[#4c4c4a] rounded transition duration-300 transform hover:scale-110"
                    >
                      <FaCalendarDay />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-6 text-gray-500">
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
        <div>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Anterior
          </button>
          <span className="mx-4">
            Pag. {page} de {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page * limit >= total}
            onClick={() => handlePageChange(page + 1)}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrabajoTitulacionListar;