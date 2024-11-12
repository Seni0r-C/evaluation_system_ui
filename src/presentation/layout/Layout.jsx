import PropTypes from "prop-types";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Barra Lateral */}
            <aside className="w-64 bg-blue-700 text-white flex-shrink-0">
                <div className="p-4 text-xl font-semibold">Calificación de Tesis</div>
                <nav>
                    <ul>
                        <li className="p-4 hover:bg-blue-800">
                            <a href="#calificaciones">Calificaciones</a>
                        </li>
                        <li className="p-4 hover:bg-blue-800">
                            <a href="#resultados">Resultados</a>
                        </li>
                        <li className="p-4 hover:bg-blue-800">
                            <a href="#configuracion">Configuración</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Área de contenido */}
            <div className="flex-1 flex flex-col">
                {/* Barra superior */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">Sistema de Calificación</div>
                    <div className="flex items-center space-x-4">
                        <span>Usuario</span>
                        <img
                            src="https://via.placeholder.com/32"
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                </header>

                {/* Contenido principal */}
                <main className="flex-1 p-0 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

// Definición de prop-types para Layout
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
