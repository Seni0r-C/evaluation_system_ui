import InputField from '../common/InputField';
import PropTypes from 'prop-types';

const FiltroTrabajoTitulacion = ({ filters, onFilterChange, carreras, modalidades, estados, verTodo, user }) => (
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    {verTodo && (
      <InputField
        label="Carrera"
        type="select"
        name="carrera_id"
        value={filters.carrera_id}
        onChange={onFilterChange}
        options={carreras.filter(carrera => user.carreras.includes(carrera.id) || verTodo)}
        placeholder="Seleccione una carrera"
        capitalize
      />
    )}

    <InputField
      label="Título"
      name="titulo"
      value={filters.titulo}
      onChange={onFilterChange}
      placeholder="Filtrar por título"
    />

    <InputField
      label="Fecha defensa"
      type="date"
      name="fecha_defensa"
      value={filters.fecha_defensa}
      onChange={onFilterChange}
    />

    <InputField
      label="Modalidad"
      type="select"
      name="modalidad_id"
      value={filters.modalidad_id}
      onChange={onFilterChange}
      options={modalidades}
      placeholder="Seleccione una modalidad"
    />

    {estados && (
      <InputField
        label="Estados"
        type="select"
        name="estado"
        value={(typeof filters.estado === 'string') ? filters.estado : ""}
        // value={filters.estado[0]}
        onChange={onFilterChange}
        options={estados}
        placeholder="Todos los estados"
      />)}
  </div>
);

FiltroTrabajoTitulacion.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
  carreras: PropTypes.array,
  modalidades: PropTypes.array,
  estados: PropTypes.array,
  verTodo: PropTypes.bool,
  user: PropTypes.object
};

export default FiltroTrabajoTitulacion;
