import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";


import logo from '../assets/logo_bar_claro.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RutaRaiz } from '../utils/constants';

const menuData = [
    {
        name: 'Inicio',
        href: RutaRaiz,
        roles: [0], // Disponible para todos los roles
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
        name: 'Registro Trabajo',
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
    const [userPhoto, setUserPhoto] = useState(null);

    const dropdownRef = useRef(null);


    useEffect(() => {
        // Obtiene información del usuario desde localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { nombre, roles, fotoBase64 } = JSON.parse(userInfo);

            setUserPhoto(`data:image/jpeg;base64,${fotoBase64}`);

            // Dividir el nombre en partes
            const partesNombre = nombre.split(' ');

            // Obtener el primer apellido y el primer nombre
            const primerApellido = partesNombre[0];
            const primerNombre = partesNombre[2];

            // Configurar el nombre del usuario
            setNombreUsuario(`${primerApellido} ${primerNombre}`);

            // Filtrar opciones del menú basadas en el rol del usuario
            const userMenu = menuData.filter(option =>
                option.roles.some(role => roles.includes(role) || role === 0)
            );
            setFilteredMenu(userMenu);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false); // Oculta el menú
            }
        };

        // Agregar evento global de clic
        document.addEventListener('mousedown', handleClickOutside);

        // Limpieza del evento
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Barra superior */}
            <header className="bg-[#0e9343] text-gray-800 p-2 flex justify-between items-center shadow-md z-50 fixed w-full top-0 left-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full hover:bg-green-800 text-white  transition-all"
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
                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={toggleDropdown}
                        className="cursor-pointer flex items-center md:space-x-4 mr-8"
                    >
                        <span className="font-semibold text-xs md:text-base text-right text-white">
                            {nombreUsuario.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()).join(' ')}
                        </span>
                        <img
                            src={userPhoto}
                            alt="Foto de perfil"
                            className="rounded-full w-10 h-10 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold border-2 border-green-600 object-cover"
                        />
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
                    className={`bg-gray-50 text-gray-800 py-6 px-2 space-y-6 w-56 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        } shadow-lg`}
                >
                    <nav className="space-y-4">
                        {filteredMenu.map((item, index) => (
                            <div key={index}>
                                {/* Opción principal con el ícono dentro del <a> */}
                                <Link
                                    to={item.href}
                                    className="flex items-center py-2 px-4 hover:bg-gray-300 rounded-md transition-colors flex-1 justify-between font-medium"
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
                                                    className="block p-2 hover:bg-green-500 rounded-md transition-colors"
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
                    className={`flex-grow bg-white shadow-inner transition-all duration-300 ease-in-out mt-2 ${isSidebarVisible ? 'md:ml-56' : 'md:ml-0'}`}
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
