import PropTypes from 'prop-types';
import Spinner from './logo_carga/Spinner';

const LoadingScreen = ({ isLoading, mensaje = "Cargando..." }) => {
    if (!isLoading) return null;  // Si isLoading es false, no se muestra nada

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center">
                <Spinner/>
                {/* <FciSvg ancho={300}/> */}
                <p className="mt-4 text-xl font-medium text-[#f7f7f7]">{mensaje}</p>
            </div>
        </div>

    );
};

LoadingScreen.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    mensaje: PropTypes.string,
};

export default LoadingScreen;
