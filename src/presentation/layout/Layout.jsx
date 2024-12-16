import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";


import logo from '../../assets/logo_bar.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../domain/useAuth';
import { RutaRaiz } from '../../utils/constants';

const menuData = [
    {
        name: 'Inicio',
        href: RutaRaiz,
        roles: [1, 2], // Disponible para roles 1 (Administrador) y 2 (Usuario estándar)
        subOptions: [],
    },
    {
        name: 'Modalidades de Titulación',
        href: '/modalidades',
        roles: [1], // Disponible para ambos roles
        subOptions: [],
    },
    {
        name: 'Items de revista',
        href: '/items-revista',
        roles: [1], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
    },
    {
        name: 'Items de rúbrica',
        href: '/items-rubrica',
        roles: [1], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
    },
    {
        name: 'Registro proyectos titulación',
        href: '/registro-proyecto-titulacion',
        roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
    },
];

const Layout = ({ children }) => {
    // Lee el estado inicial de localStorage
    const [isSidebarVisible, setSidebarVisible] = useState(() => {
        const savedState = localStorage.getItem('isSidebarVisible');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [filteredMenu, setFilteredMenu] = useState([]);

    useEffect(() => {
        // Obtiene información del usuario desde localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { nombre, apellido, id_rol } = JSON.parse(userInfo);

            // Configurar el nombre del usuario
            const primerNombre = nombre.split(' ')[0];
            const primerApellido = apellido.split(' ')[0];
            setNombreUsuario(`${primerNombre} ${primerApellido}`);

            // Filtrar opciones del menú basadas en el rol del usuario
            const userMenu = menuData.filter(option => option.roles.includes(id_rol));
            setFilteredMenu(userMenu);
        }
    }, []);


    const toggleSidebar = () => {
        setSidebarVisible((prevVisible) => {
            const newVisible = !prevVisible;
            localStorage.setItem('isSidebarVisible', JSON.stringify(newVisible));
            return newVisible;
        });
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // Función para manejar el clic y alternar la visibilidad
    const toggleSubOptions = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#2a8c44] text-gray-800">
            {/* Barra superior */}
            <header className="bg-gray-100 text-gray-800 p-2 flex justify-between items-center shadow-lg z-50 fixed w-full top-0 left-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full hover:bg-[#2a8c44] hover:text-white transition-all"
                    >
                        {isSidebarVisible ? (
                            <IoMdClose className="h-6 w-6" />
                        ) : (
                            <IoMdMenu className="h-6 w-6" />
                        )}
                    </button>
                    <Link to={RutaRaiz}>
                        <img src={logo} alt="Logo de Portocomercio" className="h-14 w-auto" />
                    </Link>

                </div>
                <div className="relative">
                    <div
                        onClick={toggleDropdown}
                        className="cursor-pointer flex items-center space-x-4"
                    >
                        <span className="font-semibold text-lg">{nombreUsuario}</span>
                        <div className="rounded-full w-10 h-10 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold">
                            {nombreUsuario.slice(0, 1)}
                        </div>
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                            <button
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                                onClick={() => navigate("/profile")}
                            >
                                <FaUserCircle className="h-5 w-5" />
                                <span>Ver Perfil</span>
                            </button>
                            <button
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                                onClick={() => { localStorage.clear(); setIsAuthenticated(false); }}
                            >
                                <IoIosLogOut className="h-5 w-5" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>

                    )
                    }
                </div >
            </header >

            {/* Contenedor principal que incluye la barra lateral y el contenido */}
            < div
                className={`flex flex-grow overflow-hidden transition-all duration-300 ease-in-out pt-16`}
            >
                {/* Barra lateral */}
                < aside
                    className={`bg-[#2a8c44] text-white p-6 space-y-6 w-64 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        }`}
                >
                    <nav className="space-y-4">
                        {filteredMenu.map((item, index) => (
                            <div key={index}>
                                {/* Opción principal con el ícono dentro del <a> */}
                                <Link
                                    to={item.href}
                                    className="flex items-center p-2 hover:bg-blue-600 rounded-md transition-colors flex-1 justify-between"
                                    onClick={() => toggleSubOptions(index)} // Manejar clic para expandir/contraer

                                >
                                    {item.name}

                                    {/* Indicador de subopciones */}
                                    {item.subOptions.length > 0 && (
                                        <span className="ml-2">
                                            {openMenuIndex === index ? (
                                                <FaChevronUp className="h-4 w-4 text-white" />
                                            ) : (
                                                <FaChevronDown className="h-4 w-4 text-white" />
                                            )}
                                        </span>
                                    )}
                                </Link>

                                {/* Subopciones (solo visibles si 'openMenuIndex' coincide con el índice actual) */}
                                {item.subOptions.length > 0 && (
                                    <div
                                        className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openMenuIndex === index ? 'max-h-[1000px]' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="space-y-2">
                                            {item.subOptions.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.href}
                                                    className="block p-2 hover:bg-blue-500 rounded-md transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside >

                {/* Contenido principal */}
                < main
                    className={`flex-grow bg-white shadow-inner transition-all duration-300 ease-in-out ${isSidebarVisible ? 'md:ml-64' : 'md:ml-0'}`}
                >
                    {children}
                </main >
            </div >
        </div >

    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
