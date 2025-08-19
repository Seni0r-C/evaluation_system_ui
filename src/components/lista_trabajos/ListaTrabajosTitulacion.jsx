import EstadoTrabajo from './EstadoTrabajo';
import AccionesTrabajo from './AccionesTrabajo';
import { capitalizeWords } from '../../utils/constants';
import PropTypes from 'prop-types';

const TrabajosTable = ({ trabajos, permisosAcciones, user }) => {
    const titleColumn = ['Título', 'Carrera', 'Modalidad', 'Estado'];
    const updatedColumnNames = permisosAcciones?.length > 0 ? [...titleColumn, 'Acciones'] : titleColumn;
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-300 text-gray-800">
                    {updatedColumnNames?.map((header) => (
                        <th key={header} className="border-b px-6 py-3 font-bold text-left">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {trabajos.length > 0 ? (
                    trabajos.map((trabajo) => {
                        const columns = [
                            trabajo.titulo.trim().length > 60 ? `${trabajo.titulo.trim().substring(0, 60)}...` : trabajo.titulo,
                            capitalizeWords(trabajo.carrera),
                            trabajo.modalidad,
                            <EstadoTrabajo estado={trabajo.estado} estado_id={trabajo.estado_id} key={trabajo.id} />,
                        ];

                        if (permisosAcciones?.length > 0) {
                            columns.push(
                                <AccionesTrabajo
                                    trabajo={trabajo}
                                    permisosAcciones={permisosAcciones}
                                    user={user}
                                />
                            );
                        }

                        return (
                            <tr key={trabajo.id} className="hover:bg-gray-100 transition-colors">
                                {columns.map((content, index) => (
                                    <td key={index} className="px-6 py-4">
                                        {content}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center p-6 text-gray-500">
                            No se encontraron trabajos
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

TrabajosTable.propTypes = {
    trabajos: PropTypes.array.isRequired,
    permisosAcciones: PropTypes.array,
    user: PropTypes.object,
};

export default TrabajosTable;
