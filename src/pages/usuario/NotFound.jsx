import { Link } from 'react-router-dom';
import { baseRoute } from '../../utils/constants';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0e9343]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-center p-10 max-w-md bg-white shadow-xl rounded-2xl backdrop-blur-lg bg-opacity-90 hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                <h1 className="text-9xl font-extrabold text-[#0e9343] tracking-widest">404</h1>
                <p className="text-xl font-medium text-gray-700 mt-4">
                    Página no encontrada.
                </p>
                <p className="text-gray-500 mt-2">
                    Parece que te has perdido en la inmensidad del internet.
                </p>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mt-6"
                >
                    <Link
                        to={baseRoute + "/"}
                        className="px-6 py-3 text-lg font-semibold text-white bg-[#0e9343] rounded-full shadow-md hover:bg-opacity-90 transition-colors">
                        Volver al inicio
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;