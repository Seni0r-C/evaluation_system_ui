import { useState } from 'react';

const EvaluacionTesis = () => {
    // Datos de ejemplo para los estudiantes y sus tesis
    const estudiantes = [
        {
            id: 1,
            nombre: 'Juan Pérez',
            titulo: 'Análisis de Algoritmos en la Ciencia de Datos',
            tesisLink: 'https://linktothesistodocument.com',
            calificaciones: {
                escrita: 0,
                oral: 0,
            },
        },
        {
            id: 2,
            nombre: 'Ana Gómez',
            titulo: 'Estudio de Redes Neuronales para Predicción Financiera',
            tesisLink: 'https://linktothesistodocument.com',
            calificaciones: {
                escrita: 0,
                oral: 0,
            },
        },
    ];

    const [selectedEstudiante, setSelectedEstudiante] = useState(estudiantes[0]); // Estudiante seleccionado
    const [isDocumentOpen, setIsDocumentOpen] = useState(false); // Estado para abrir el documento

    // Función para manejar la calificación
    const handleCalificacionChange = (campo, valor) => {
        setSelectedEstudiante({
            ...selectedEstudiante,
            calificaciones: {
                ...selectedEstudiante.calificaciones,
                [campo]: valor,
            },
        });
    };

    // Función para abrir/ cerrar el documento
    const toggleDocumentPreview = () => {
        setIsDocumentOpen(!isDocumentOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluación de Tesis</h2>

                {/* Selector de Estudiante */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700">Seleccionar Estudiante</h3>
                    <div className="flex space-x-4 mt-2">
                        {estudiantes.map((estudiante) => (
                            <button
                                key={estudiante.id}
                                onClick={() => setSelectedEstudiante(estudiante)}
                                className={`px-4 py-2 rounded-lg border ${selectedEstudiante.id === estudiante.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} hover:bg-blue-500 hover:text-white`}
                            >
                                {estudiante.nombre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Vista previa del documento */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Ver Documento de Tesis</h3>
                    <button
                        onClick={toggleDocumentPreview}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        {isDocumentOpen ? 'Cerrar Documento' : 'Abrir Documento'}
                    </button>
                    {isDocumentOpen && (
                        <iframe
                            src={selectedEstudiante.tesisLink}
                            title="Documento de Tesis"
                            className="mt-4 w-full h-96 border border-gray-300 rounded-lg"
                        ></iframe>
                    )}
                </div>

                {/* Calificación de la tesis */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Calificar Tesis</h3>

                    {/* Calificación de la parte escrita */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800">Parte Escrita</h4>
                        <div className="grid grid-cols-5 gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((puntuacion) => (
                                <button
                                    key={puntuacion}
                                    onClick={() => handleCalificacionChange('escrita', puntuacion)}
                                    className={`px-4 py-2 rounded-lg border ${selectedEstudiante.calificaciones.escrita === puntuacion ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-600 hover:text-white`}
                                >
                                    {puntuacion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calificación de la parte oral */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">Parte Oral</h4>
                        <div className="grid grid-cols-5 gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((puntuacion) => (
                                <button
                                    key={puntuacion}
                                    onClick={() => handleCalificacionChange('oral', puntuacion)}
                                    className={`px-4 py-2 rounded-lg border ${selectedEstudiante.calificaciones.oral === puntuacion ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-600 hover:text-white`}
                                >
                                    {puntuacion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botón para guardar calificación */}
                    <div className="mt-6">
                        <button
                            onClick={() => alert('Calificación guardada')}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none"
                        >
                            Guardar Calificación
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluacionTesis;
