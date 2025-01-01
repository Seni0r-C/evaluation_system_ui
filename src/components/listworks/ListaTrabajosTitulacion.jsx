import React from 'react';
import EstadoTrabajo from './EstadoTrabajo';
import AccionesTrabajo from './AccionesTrabajo';
import { capitalizeWords } from '../../utils/constants';

const ListaTrabajosTitulacion = ({ trabajos, acciones, user }) => {
    const colnBase = ['Título', 'Carrera', 'Archivo', 'Modalidad', 'Estado'];
    const colnames = acciones?.length > 0 ? [...colnBase, ...acciones] : colnBase;
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-300 text-gray-800">
                    {colnames?.map((header) => (
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
                            <td className="px-6 py-4">{trabajo.titulo}</td>
                            <td className="px-6 py-4">{capitalizeWords(trabajo.carrera)}</td>
                            <td className="px-6 py-4">
                                <a
                                    href={trabajo.link_archivo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-green-700 hover:underline font-normal"
                                >
                                    Ver archivo
                                </a>
                            </td>
                            <td className="px-6 py-4">{trabajo.modalidad}</td>
                            <td className="px-6 py-4">
                                <EstadoTrabajo estado={trabajo.estado} />
                            </td>
                            {acciones?.length > 0 && (
                                <td className="px-6 py-4">
                                    <AccionesTrabajo trabajo={trabajo} acciones={acciones} user={user} />
                                </td>
                            )}
                        </tr>
                    ))
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

export default ListaTrabajosTitulacion;
