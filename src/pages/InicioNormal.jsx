import { Link } from "react-router-dom";

const InicioNormal = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Título de bienvenida */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Bienvenido al Sistema de Calificación</h1>
                <p className="text-gray-600 mt-2">Aquí puedes gestionar tus trabajos de titulación de manera sencilla.</p>
            </div>

            {/* Panel de acciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tesis por calificar */}
                <div className="bg-blue-200 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700">Tesis por calificar</h2>
                    <p className="text-gray-600 mt-2">Actualmente tienes <span className="font-bold text-blue-500">3 tesis</span> asignadas para calificar.</p>
                    <Link to="/trabajos-titulacion" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block">Ver detalles</Link>
                </div>

                {/* Buscador de trabajos */}
                <div className="bg-yellow-200 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700">Buscador de trabajos</h2>
                    <p className="text-gray-600 mt-2">Busca y consulta detalles de trabajos de titulación.</p>
                    <Link to="/trabajos-titulacion" className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 inline-block">Buscar trabajos</Link>
                </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-100 shadow-inner rounded-lg p-4">
                <h2 className="text-lg font-medium text-gray-700">Información adicional</h2>
                <p className="text-gray-600 mt-2">Recuerda revisar periódicamente tus asignaciones y el calendario de eventos para mantenerte al día.</p>
            </div>
        </div>
    );
};

export default InicioNormal;
