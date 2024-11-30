import { useState } from 'react';
import PropTypes from 'prop-types';

const ModalidadesTitulacion = () => {
    // Datos de prueba
    const [faculties, setFaculties] = useState([
        {
            id: 1,
            name: 'Ciencias Informáticas',
            careers: [
                {
                    id: 1,
                    name: 'Tecnología de la Información',
                    modalities: ['Tesis', 'Examen General', 'Proyecto Integrador'],
                },
                // {
                //     id: 2,
                //     name: 'Telecomunicaciones',
                //     modalities: ['Tesis', 'Examen General'],
                // },
            ],
        },
    ]);

    const [selectedCareer, setSelectedCareer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [modalInput, setModalInput] = useState('');

    const openModal = (career) => {
        setSelectedCareer(career);
        setModalVisible(true);
        setEditingMode(false);
        setModalInput('');
    };

    const handleAddModal = () => {
        if (!modalInput.trim()) return;
        const updatedFaculties = faculties.map((faculty) => ({
            ...faculty,
            careers: faculty.careers.map((career) =>
                career.id === selectedCareer.id
                    ? { ...career, modalities: [...career.modalities, modalInput] }
                    : career
            ),
        }));
        setFaculties(updatedFaculties);
        setModalInput('');
        setModalVisible(false);
    };

    const handleDeleteModal = (careerId, modality) => {
        const updatedFaculties = faculties.map((faculty) => ({
            ...faculty,
            careers: faculty.careers.map((career) =>
                career.id === careerId
                    ? {
                        ...career,
                        modalities: career.modalities.filter((mod) => mod !== modality),
                    }
                    : career
            ),
        }));
        setFaculties(updatedFaculties);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Modalidades de Titulación</h1>

            {faculties.map((faculty) => (
                <div key={faculty.id} className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">{faculty.name}</h2>
                    {faculty.careers.map((career) => (
                        <div key={career.id} className="bg-white shadow p-4 rounded mt-4">
                            <h3 className="text-lg font-medium text-gray-700">{career.name}</h3>
                            <ModalitiesTable
                                career={career}
                                onAdd={() => openModal(career)}
                                onDelete={handleDeleteModal}
                            />
                        </div>
                    ))}
                </div>
            ))}

            {modalVisible && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded p-6 shadow w-96">
                        <h3 className="text-lg font-bold text-gray-700">
                            {editingMode ? 'Editar Modalidad' : 'Agregar Modalidad'}
                        </h3>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full mt-4 p-2"
                            placeholder="Nombre de la modalidad"
                            value={modalInput}
                            onChange={(e) => setModalInput(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={() => setModalVisible(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleAddModal}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ModalitiesTable = ({ career, onAdd, onDelete }) => {
    return (
        <div className="mt-2">
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2 text-left">Modalidad</th>
                        <th className="border border-gray-200 p-2 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {career.modalities.map((modality, index) => (
                        <tr key={index}>
                            <td className="border border-gray-200 p-2">{modality}</td>
                            <td className="border border-gray-200 p-2 text-right">
                                <button
                                    className="text-red-600 hover:text-red-800 font-bold"
                                    onClick={() => onDelete(career.id, modality)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2" className="p-2 text-right">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={onAdd}
                            >
                                Agregar Modalidad
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

ModalidadesTitulacion.propTypes = {
    faculties: PropTypes.array.isRequired,
    setFaculties: PropTypes.func.isRequired,
};

ModalitiesTable.propTypes = {
    career: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ModalidadesTitulacion;
