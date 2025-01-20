import { Link } from 'react-router-dom';
import { RutaRaiz } from '../utils/constants';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 max-w-lg bg-white shadow-lg rounded-lg hover:scale-105 transition-transform transform">
                <h1 className="text-8xl font-bold text-[#0e9343]">404</h1>
                <p className="text-2xl font-semibold text-gray-800 mt-4">
                    ¡Lo sentimos! Página no encontrada.
                </p>
                <p className="text-gray-600 mt-2">
                    Es posible que el enlace esté roto o que la página ya no exista.
                </p>
                <div className="mt-6">
                    <Link
                        to={RutaRaiz}
                        className="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-medium shadow-md duration-300 ease-in-out transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
