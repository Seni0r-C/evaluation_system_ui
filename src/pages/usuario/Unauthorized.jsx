import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-full bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'linear' }} // Animación lineal
                className="text-center p-10 max-w-md bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-auto text-red-500"
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
                </motion.div>
                <h1 className="mt-6 text-3xl font-extrabold text-gray-800">
                    Acceso Denegado
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    No tienes permisos para acceder a esta página.
                </p>
                <p className="text-sm text-gray-500">
                    Si crees que esto es un error, contacta al administrador.
                </p>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mt-6"
                >
                    <Link
                        to="/"
                        className="px-6 py-3 text-lg font-semibold text-white bg-[#0e9343] rounded-full shadow-md hover:bg-opacity-90 transition-colors"
                    >
                        Volver al Inicio
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Unauthorized;
