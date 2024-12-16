import { Link } from 'react-router-dom';
import { RutaRaiz } from '../utils/constants';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-[#004071]">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">
                    Oops! La página que buscas no existe.
                </p>
                <p className="text-gray-500 mt-2">
                    Es posible que la página haya sido movida o eliminada.
                </p>
                <Link
                    to={RutaRaiz}
                    className="mt-6 inline-block px-6 py-3 text-white bg-[#009fe3] hover:bg-[#0077d1] rounded-full text-lg font-medium shadow-md transition-transform transform hover:scale-105"
                >
                    Volver a la página de inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
