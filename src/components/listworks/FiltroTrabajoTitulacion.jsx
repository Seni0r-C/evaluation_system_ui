import React from 'react';
import InputField from '../common/InputField';

const FiltroTrabajoTitulacion = ({ filters, onFilterChange, carreras, modalidades, estados, verTodo, user }) => (
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <InputField
      label="Título"
      name="titulo"
      value={filters.titulo}
      onChange={onFilterChange}
      placeholder="Filtrar por título"
    />

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
        value={filters.estado}
        onChange={onFilterChange}
        options={estados}
        placeholder="Seleccione un estado"
    />)}
  </div>
);

export default FiltroTrabajoTitulacion;
