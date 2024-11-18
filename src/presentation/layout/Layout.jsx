import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/logo_bar.webp';

const menuData = [
    {
        name: 'Inicio',
        href: '/',
        subOptions: [],
    },
    {
        name: 'Modalidades de Titulación',
        href: '/modalidades',
        subOptions: [],
    },
    {
        name: 'Evaluación',
        href: '#',
        subOptions: [
            { name: 'Propuesta Tecnologica', href: '/evaluacion-tesis' },
            { name: 'Artículo Científico', href: '/evaluacion-articulo' },
        ],
    },
    {
        name: 'Opción 3',
        href: '#opcion3',
        subOptions: [],
    },
];
const Layout = ({ children }) => {
    // Lee el estado inicial de localStorage
    const [isSidebarVisible, setSidebarVisible] = useState(() => {
        const savedState = localStorage.getItem('isSidebarVisible');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');

    useEffect(() => {
        // Obtiene el nombre del usuario desde localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const userInfoParsed = JSON.parse(userInfo);
            const nombre = userInfoParsed[0].nombre;
            const apellido = userInfoParsed[0].apellido;

            // Extraer solo el primer nombre y el primer apellido
            const primerNombre = nombre.split(' ')[0];  // Toma la primera palabra antes del espacio
            const primerApellido = apellido.split(' ')[0];  // Toma la primera palabra antes del espacio

            // Solo el primer nombre y el primer apellido
            setNombreUsuario(`${primerNombre} ${primerApellido}`);  // Pasa los valores al estado
        }
    }, []);


    const toggleSidebar = () => {
        setSidebarVisible((prevVisible) => {
            const newVisible = !prevVisible;
            localStorage.setItem('isSidebarVisible', JSON.stringify(newVisible));
            return newVisible;
        });
    };

    // Función para manejar el clic y alternar la visibilidad
    const toggleSubOptions = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    return (<div className="min-h-screen flex flex-col bg-[#2a8c44] text-gray-800">
        {/* Barra superior */}
        <header className="bg-gray-100 text-gray-800 p-2 flex justify-between items-center shadow-lg z-50 fixed w-full top-0 left-0">
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-[#2a8c44] hover:text-white transition-all"
                >
                    {isSidebarVisible ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
                <img src={logo} alt="Logo de Portocomercio" className="h-14 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
                <span className="font-semibold text-lg">{nombreUsuario}</span>
                <div className="rounded-full w-10 h-10 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold">
                    {/* mostrar solo al primer letra del nombre */}
                    {nombreUsuario.slice(0, 1)}
                </div>
            </div>
        </header>

        {/* Contenedor principal que incluye la barra lateral y el contenido */}
        <div
            className={`flex flex-grow overflow-hidden transition-all duration-300 ease-in-out pt-16`}
        >
            {/* Barra lateral */}
            <aside
                className={`bg-[#2a8c44] text-white p-6 space-y-6 w-64 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
            >
                <nav className="space-y-4">
                    {menuData.map((item, index) => (
                        <div key={index}>
                            {/* Opción principal con el ícono dentro del <a> */}
                            <a
                                href={item.href}
                                className="flex items-center p-2 hover:bg-blue-600 rounded-md transition-colors flex-1 justify-between"
                                onClick={() => toggleSubOptions(index)} // Manejar clic para expandir/contraer
                            >
                                {item.name}

                                {/* Indicador de subopciones */}
                                {item.subOptions.length > 0 && (
                                    <span className="ml-2">
                                        {openMenuIndex === index ? (
                                            <ChevronUpIcon className="h-5 w-5 text-white" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-white" />
                                        )}
                                    </span>
                                )}
                            </a>

                            {/* Subopciones (solo visibles si 'openMenuIndex' coincide con el índice actual) */}
                            {item.subOptions.length > 0 && (
                                <div
                                    className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openMenuIndex === index ? 'max-h-[1000px]' : 'max-h-0'
                                        }`}
                                >
                                    <div className="space-y-2">
                                        {item.subOptions.map((subItem, subIndex) => (
                                            <a
                                                key={subIndex}
                                                href={subItem.href}
                                                className="block p-2 hover:bg-blue-500 rounded-md transition-colors"
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Contenido principal */}
            <main
                className={`flex-grow bg-white shadow-inner transition-all duration-300 ease-in-out ${isSidebarVisible ? 'md:ml-64' : 'md:ml-0'}`}
            >
                {children}
            </main>
        </div>
    </div>

    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
