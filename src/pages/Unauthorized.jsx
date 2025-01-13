import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="flex justify-center">
                    {/* Icono o Ilustración */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 4h.01M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z"
                        />
                    </svg>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-gray-800">
                    Acceso Denegado
                </h1>
                <p className="mt-2 text-gray-600">
                    No tienes permisos para acceder a esta página. Si crees que esto es un error, contacta al administrador.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
