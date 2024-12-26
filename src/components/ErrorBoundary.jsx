import React from 'react';
import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '', errorInfo: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.toString() };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error capturado por ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo: errorInfo.componentStack });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6">
                        <div className="text-center">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl text-red-500 mb-4 mx-auto" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
                                ¡Oops! Algo salió mal
                            </h1>
                            <p className="text-base sm:text-lg text-gray-700 mb-6">
                                Ocurrió un error inesperado. Intenta recargar la página o contacta al soporte técnico.
                            </p>
                            <button
                                className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-75 transition duration-300 ease-in-out"
                                onClick={() => window.location.reload()}
                            >
                                Recargar Página
                            </button>
                        </div>

                        {/* Información del desarrollador */}
                        <div className="mt-6 sm:mt-8 p-4 bg-gray-200 rounded-lg">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                                Detalles técnicos del error
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                {this.state.errorMessage}
                            </p>
                            {this.state.errorInfo && (
                                <pre className="text-xs sm:text-sm bg-gray-300 p-2 mt-4 rounded-lg overflow-x-auto">
                                    {this.state.errorInfo}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
