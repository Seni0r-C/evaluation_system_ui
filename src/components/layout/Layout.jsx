/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { capitalizeWords, baseRoute } from '../../utils/constants';
import SidebarMenu from './menu/SidebarMenu';
import axiosInstance from '../../services/axiosConfig';
import { transformMenuData } from '../../utils/menuUtils';
import logo from '../../assets/logo_claro.webp';
import { useUser } from '../../hooks/useUser';


const Layout = ({ children }) => {
    const { userName, userPhoto, roles, selectedRole, selectRole } = useUser();
    // Lee el estado inicial de localStorage
    const [isSidebarVisible, setSidebarVisible] = useState(() => {
        const savedState = localStorage.getItem('isSidebarVisible');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const dropdownRef = useRef(null);
    const [menuData, setMenuData] = useState([]);

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

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                if (!selectedRole) return; // Si no hay rol seleccionado, no hace la solicitud

                // Realiza la solicitud solo para el rol seleccionado
                const response = await axiosInstance.get(`/rutas/menu/${selectedRole.id}`);

                // Transforma los datos para el componente
                const transformedData = transformMenuData(response.data);
                setMenuData(transformedData);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, [selectedRole]);

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

    const handleRoleChange = (e) => {
        const roleName = e.target.value;
        const roleToSelect = roles.find(r => r.nombre === roleName);
        if (roleToSelect) {
            selectRole(roleToSelect);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Barra superior */}
            <header className="bg-[#0e9343] text-gray-800 flex justify-between items-center shadow-md z-50 fixed w-full top-0 left-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-green-800 text-white transition-all ml-4"
                        aria-label={isSidebarVisible ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                        aria-expanded={isSidebarVisible}
                        aria-controls="sidebar-menu"
                    >
                        {isSidebarVisible ? (
                            <IoMdClose className="h-6 w-6" />
                        ) : (
                            <IoMdMenu className="h-6 w-6" />
                        )}
                    </button>
                    <Link to={baseRoute}>
                        <img src={logo} alt="Logo del Sistema" className="h-12 w-auto" />
                    </Link>

                </div>
                <div className="relative" ref={dropdownRef}>
                    {roles.length > 0 && (
                        <button
                            onClick={toggleDropdown}
                            className="cursor-pointer flex items-center md:space-x-4 mr-8 rounded hover:bg-green-800 px-4 py-1 transition-all"
                            aria-haspopup="true"
                            aria-expanded={isDropdownVisible}
                            aria-controls="user-dropdown"
                        >
                            <div className="text-right">
                                <span className="block font-semibold text-xs md:text-base text-white">
                                    {userName}
                                </span>
                                <span className="block font-semibold text-xs md:text-sm text-gray-200">
                                    {capitalizeWords(selectedRole?.nombre || '')}
                                </span>
                            </div>
                            <img
                                src={userPhoto}
                                alt="Foto de perfil"
                                className="rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold border-2 border-green-600 object-cover"
                            />
                        </button>
                    )}

                    {isDropdownVisible && (
                        <div id="user-dropdown" className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                            <div
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                <label htmlFor="role-select" className="sr-only">Seleccionar Rol</label>
                                <select
                                    id="role-select"
                                    className=" block w-full py-2 px-3  text-pretty md:text-md font-medium rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:border-none"
                                    value={selectedRole?.nombre || ''}
                                    onChange={handleRoleChange}
                                >
                                    {roles.map((role) => (
                                        <option key={role.nombre} value={role.nombre}>
                                            {capitalizeWords(role.nombre)}
                                        </option>
                                    ))}
                                </select>
                            </div>
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

            <div className="relative">
                {/* Contenedor principal que incluye la barra lateral y el contenido */}
                <div
                    className={`flex flex-grow overflow-hidden transition-all duration-300 ease-in-out pt-16`}
                >
                    <div
                        onClick={() => setSidebarVisible(false)} // Cierra el menú al hacer clic
                        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-10 ${isSidebarVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                    ></div>

                    {/* Barra lateral */}
                    <nav
                        id="sidebar-menu"
                        aria-label="Menú de navegación principal"
                        className={`bg-gray-100 text-gray-950 py-6 px-2 z-30 space-y-6 w-56 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full'
                            } border-r-2 border-gray-200 overflow-y-scroll pb-20`}
                        style={{
                            minHeight: `calc(100vh - 4rem)`, // Altura mínima dinámica (100% del viewport menos el header)
                        }}
                    >
                        <SidebarMenu menuData={menuData} />
                    </nav>

                    {/* Contenido principal */}
                    <main
                        className={`flex-grow bg-white shadow-inner transition-all duration-300 ease-in-out mt-2 ${isSidebarVisible ? 'md:ml-56' : 'md:ml-0'
                            }`}
                        style={{
                            minHeight: `calc(100vh - 4rem)`, // Altura mínima dinámica (100% del viewport menos el header)
                        }}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div >

    );
};

export default Layout;
