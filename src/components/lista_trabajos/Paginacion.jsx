import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Paginacion = ({ page, total, limit, onPageChange, onLimitChange }) => (
  <div className="mt-4 flex justify-between items-center">
    <div>
      <label className="mr-2">Mostrar</label>
      <select value={limit} onChange={onLimitChange} className="p-2 border rounded">
        {[10, 20, 50].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span className="ml-2">trabajos por página</span>
    </div>
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        <FaChevronLeft /> Anterior
      </button>
      <span className="mx-4">
        Pag. {page} de {Math.ceil(total / limit)}
      </span>
      <button
        disabled={page * limit >= total}
        onClick={() => onPageChange(page + 1)}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Siguiente <FaChevronRight />
      </button>
    </div>
  </div>
);

Paginacion.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Paginacion;
