import { Link } from "react-router-dom";

const InicioEstudiante = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Título de bienvenida */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido al Sistema de Calificación!</h1>
                <p className="text-gray-600 mt-2">Puedes informarle a tu tutor que ya estás registrado para que te asocie a una tesis.</p>
            </div>

            {/* Panel de acciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Buscador de trabajos */}
                <div className="bg-yellow-200 shadow-lg rounded-md p-5">
                    <h2 className="text-xl font-semibold text-gray-700">Ver trabajos de titulación</h2>
                    <p className="text-gray-600 mt-2">Busca y consulta detalles de trabajos de titulación realizados.</p>
                    <Link to="/trabajos-titulacion-realizados" className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 inline-block">Explorar</Link>
                </div>
            </div>
        </div>
    );
};

export default InicioEstudiante;
