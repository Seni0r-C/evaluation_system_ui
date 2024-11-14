import { useState } from 'react';

const ModalidadesTitulacion = () => {
    // Estado para almacenar las modalidades de titulación
    const [modalidades, setModalidades] = useState([
        { id: 1, nombre: 'Tesis de Grado', descripcion: 'Elaboración de una tesis formal para obtener el título' },
        { id: 2, nombre: 'Examen Profesional', descripcion: 'Evaluación teórica y práctica sobre la carrera' },
    ]);
    const [editModal, setEditModal] = useState(null); // Para editar una modalidad
    const [newModalidad, setNewModalidad] = useState({ nombre: '', descripcion: '' }); // Nueva modalidad

    // Función para agregar una nueva modalidad
    const agregarModalidad = () => {
        if (newModalidad.nombre && newModalidad.descripcion) {
            const newId = modalidades.length + 1;
            setModalidades([...modalidades, { ...newModalidad, id: newId }]);
            setNewModalidad({ nombre: '', descripcion: '' });
        }
    };

    // Función para editar una modalidad existente
    const editarModalidad = (id) => {
        const modalidadToEdit = modalidades.find((modalidad) => modalidad.id === id);
        setEditModal(modalidadToEdit);
    };

    // Función para guardar la modalidad editada
    const guardarModalidadEditada = () => {
        const updatedModalidades = modalidades.map((modalidad) =>
            modalidad.id === editModal.id ? editModal : modalidad
        );
        setModalidades(updatedModalidades);
        setEditModal(null);
    };

    // Función para eliminar una modalidad
    const eliminarModalidad = (id) => {
        setModalidades(modalidades.filter((modalidad) => modalidad.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Administrar Modalidades de Titulación</h2>

                {/* Formulario para agregar una modalidad */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Agregar Nueva Modalidad</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Nombre de la Modalidad</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newModalidad.nombre}
                                onChange={(e) => setNewModalidad({ ...newModalidad, nombre: e.target.value })}
                                placeholder="Ejemplo: Tesis de Grado"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Descripción</label>
                            <textarea
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newModalidad.descripcion}
                                onChange={(e) => setNewModalidad({ ...newModalidad, descripcion: e.target.value })}
                                placeholder="Describe brevemente la modalidad"
                            />
                        </div>
                        <button
                            onClick={agregarModalidad}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                        >
                            Agregar Modalidad
                        </button>
                    </div>
                </div>

                {/* Modalidades list */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Lista de Modalidades de Titulación</h3>
                    <div className="space-y-4">
                        {modalidades.map((modalidad) => (
                            <div key={modalidad.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{modalidad.nombre}</h4>
                                    <p className="text-gray-600">{modalidad.descripcion}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => editarModalidad(modalidad.id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarModalidad(modalidad.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal de edición */}
                {editModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Editar Modalidad</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-600">Nombre de la Modalidad</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editModal.nombre}
                                        onChange={(e) => setEditModal({ ...editModal, nombre: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Descripción</label>
                                    <textarea
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={editModal.descripcion}
                                        onChange={(e) => setEditModal({ ...editModal, descripcion: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={guardarModalidadEditada}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditModal(null)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalidadesTitulacion;
