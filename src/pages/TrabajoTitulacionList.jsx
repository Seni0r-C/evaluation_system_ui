import  { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';

const TrabajoTitulacionList = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    carrera_id: '',
    modalidad_id: '',
    estado: '',
    titulo: ''
  });

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trabajos de Titulación</h1>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="titulo"
          value={filters.titulo}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Filtrar por título"
        />
        <input
          type="number"
          name="carrera_id"
          value={filters.carrera_id}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Filtrar por carrera"
        />
        <input
          type="number"
          name="modalidad_id"
          value={filters.modalidad_id}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Filtrar por modalidad"
        />
        <input
          type="text"
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Filtrar por estado"
        />
      </div>

      {/* Lista de trabajos */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Título</th>
            <th className="border px-4 py-2">Carrera</th>
            <th className="border px-4 py-2">Modalidad</th>
            <th className="border px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {trabajos.length > 0 ? (
            trabajos.map((trabajo) => (
              <tr key={trabajo.id}>
                <td className="border px-4 py-2">{trabajo.titulo}</td>
                <td className="border px-4 py-2">{trabajo.carrera}</td>
                <td className="border px-4 py-2">{trabajo.modalidad}</td>
                <td className="border px-4 py-2">{trabajo.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No se encontraron trabajos</td>
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
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Anterior
          </button>
          <span className="mx-4">{page}</span>
          <button
            disabled={page * limit >= total}
            onClick={() => handlePageChange(page + 1)}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrabajoTitulacionList;