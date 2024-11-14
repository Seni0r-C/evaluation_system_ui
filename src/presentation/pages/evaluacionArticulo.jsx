import { useState } from 'react';

const EvaluacionArticulo = () => {
    // Datos de ejemplo para el artículo científico
    const articulo = {
        titulo: 'Explorando Nuevas Fronteras en Inteligencia Artificial',
        autor: 'Dr. Luis Martínez',
        resumen: 'Este artículo examina los avances más recientes en el campo de la inteligencia artificial, con un enfoque en técnicas innovadoras como el aprendizaje profundo...',
        link: 'https://linktoarticle.com',
        rubrica: [
            { criterio: 'Claridad y Cohesión', descripcion: 'El artículo está bien estructurado, claro y fácil de seguir.', maxPuntaje: 5 },
            { criterio: 'Innovación y Originalidad', descripcion: 'El artículo presenta ideas innovadoras y aborda un tema original.', maxPuntaje: 5 },
            { criterio: 'Relevancia del Tema', descripcion: 'El artículo aborda un tema relevante en el contexto actual.', maxPuntaje: 5 },
            { criterio: 'Calidad de la Investigación', descripcion: 'La investigación está bien documentada y tiene una sólida base teórica.', maxPuntaje: 5 },
            { criterio: 'Impacto Potencial', descripcion: 'El artículo tiene el potencial de influir o cambiar su área de estudio.', maxPuntaje: 5 },
        ],
    };

    // Estado para almacenar las calificaciones
    const [calificaciones, setCalificaciones] = useState(
        articulo.rubrica.reduce((acc, criterio) => {
            acc[criterio.criterio] = 0; // Inicializa todas las calificaciones a 0
            return acc;
        }, {})
    );

    // Función para manejar cambios en las calificaciones
    const handleCalificacionChange = (criterio, valor) => {
        setCalificaciones({
            ...calificaciones,
            [criterio]: valor,
        });
    };

    // Función para calcular el puntaje total
    const calcularPuntajeTotal = () => {
        return Object.values(calificaciones).reduce((acc, val) => acc + val, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluación del Artículo Científico</h2>

                {/* Detalles del artículo */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{articulo.titulo}</h3>
                    <p className="text-gray-600 mb-4">Autor: {articulo.autor}</p>
                    <p className="text-gray-700">{articulo.resumen}</p>

                    <a href={articulo.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 block">
                        Leer el artículo completo
                    </a>
                </div>

                {/* Rúbrica de Evaluación */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-6">Rúbrica de Evaluación</h3>

                    {articulo.rubrica.map((criterio) => (
                        <div key={criterio.criterio} className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800">{criterio.criterio}</h4>
                            <p className="text-gray-600 mb-2">{criterio.descripcion}</p>

                            <div className="flex space-x-4">
                                {[1, 2, 3, 4, 5].map((valor) => (
                                    <button
                                        key={valor}
                                        onClick={() => handleCalificacionChange(criterio.criterio, valor)}
                                        className={`px-4 py-2 rounded-lg border ${calificaciones[criterio.criterio] === valor ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-600 hover:text-white`}
                                    >
                                        {valor}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Puntaje total */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">Puntaje Total</h4>
                        <p className="text-gray-600">El puntaje total del artículo es: {calcularPuntajeTotal()} / {articulo.rubrica.length * 5}</p>
                    </div>

                    {/* Comentarios adicionales */}
                    <div className="mt-6">
                        <textarea
                            placeholder="Comentarios adicionales..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Botón para guardar evaluación */}
                    <div className="mt-6">
                        <button
                            onClick={() => alert('Evaluación guardada')}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none"
                        >
                            Guardar Evaluación
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluacionArticulo;
