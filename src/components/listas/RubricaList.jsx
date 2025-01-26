import PropTypes from 'prop-types';

const RubricaList = ({ rubricas, onDelete, onSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rubricas.map(rubrica => (
            <tr key={rubrica.id}>
              <td className="px-4 py-2 border">{rubrica.id}</td>
              <td className="px-4 py-2 border">{rubrica.nombre}</td>
              <td className="px-4 py-2 border">
                <button onClick={() => onSelect(rubrica)} className="bg-blue-500 text-white px-2 py-1 mr-2">Editar</button>
                <button onClick={() => onDelete(rubrica.id)} className="bg-red-500 text-white px-2 py-1">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RubricaList.propTypes = {
  rubricas: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RubricaList;
