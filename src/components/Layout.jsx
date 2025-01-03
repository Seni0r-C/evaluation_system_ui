import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo_bar_claro.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { menuData, RutaRaiz } from '../utils/constants';
import { TODOS } from '../utils/roles';
import UserContext from '../context/UserContext';
import SidebarMenu from './menu/SidebarMenu';


const Layout = ({ children }) => {
    const location = useLocation();
    const { userName, userPhoto, rolesAsStr, roles } = useContext(UserContext);
    // Lee el estado inicial de localStorage
    const [isSidebarVisible, setSidebarVisible] = useState(() => {
        const savedState = localStorage.getItem('isSidebarVisible');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [filteredMenu, setFilteredMenu] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (roles) {
            const userMenu = menuData
                .filter(option =>
                    option.roles.some(role => roles.includes(role) || role === TODOS) // Filtrar opciones principales
                )
                .map(option => ({
                    ...option,
                    href: option.subOptions.length > 0 ? null : option.href, // Quitar href si tiene subOptions
                    subOptions: option.subOptions.filter(subOption =>
                        subOption.roles.some(role => roles.includes(role) || role === TODOS) // Filtrar subopciones
                    ),
                }))
                .filter(option => option.href || option.subOptions.length > 0); // Omitir opciones sin href ni subOptions

            setFilteredMenu(userMenu);
        }
    }, [roles]);



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
            <header className="bg-[#0e9343] text-gray-800 flex justify-between items-center shadow-md z-50 fixed w-full top-0 left-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-green-800 text-white transition-all"
                    >
                        {isSidebarVisible ? (
                            <IoMdClose className="h-6 w-6" />
                        ) : (
                            <IoMdMenu className="h-6 w-6" />
                        )}
                    </button>
                    <Link to={RutaRaiz}>
                        <img src={logo} alt="Logo del Sistema" className="h-12 w-auto" />
                    </Link>

                </div>
                <div className="relative" ref={dropdownRef}>
                    {rolesAsStr ? (<div
                        onClick={toggleDropdown}
                        className="cursor-pointer flex items-center md:space-x-4 mr-8 rounded hover:bg-green-800 px-4 py-1 transition-all"
                    >
                        <div className="text-right">
                            <span className="block font-semibold text-xs md:text-base text-white">
                                {userName}
                            </span>
                            <span className="block font-semibold text-xs md:text-sm text-gray-200">
                                {rolesAsStr}
                            </span>
                        </div>
                        <img
                            src={userPhoto}
                            alt="Foto de perfil"
                            className="rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold border-2 border-green-600 object-cover"
                        />
                    </div>) :
                        (
                            <div
                                onClick={toggleDropdown}
                                className="cursor-pointer flex items-center md:space-x-4 mr-8 rounded hover:bg-green-800 px-4 py-1 transition-all"
                            >
                                <span className="font-semibold text-xs md:text-base text-right text-white">
                                    {userName}
                                </span>
                                <span className="font-semibold text-xs md:text-base text-right text-gray-200">
                                    {rolesAsStr}
                                </span>
                                <img
                                    src={userPhoto}
                                    alt="Foto de perfil"
                                    className="rounded-full w-10 h-10 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold border-2 border-green-600 object-cover"
                                />
                            </div>
                        )}

                    {isDropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                            <button
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                                onClick={() => { navigate("/profile"); setIsDropdownVisible(false); }}
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
                <aside
                    className={`bg-gray-100 text-gray-950 py-6 px-2 space-y-6 w-56 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} border-r-2 border-gray-200`}
                >
                    <SidebarMenu menuData={menuData} roles={roles} />
                </aside>

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
