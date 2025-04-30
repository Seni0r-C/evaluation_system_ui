import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { capitalizeWords, baseRoute } from '../../utils/constants';
import UserContext from '../../context/UserContext';
import SidebarMenu from './menu/SidebarMenu';
import axiosInstance from '../../services/axiosConfig';
import { transformMenuData } from '../../utils/menuUtils';
import logo from '../../assets/logo_claro.webp';


const Layout = ({ children }) => {
    const { userName, userPhoto, roles } = useContext(UserContext);
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
    const [selectedRole, setSelectedRole] = useState(roles[0]?.nombre || "");

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
                // Hacer múltiples solicitudes para cada rol
                const rolePromises = roles.map(role => axiosInstance.get(`/rutas/menu/${role.id}`));
                const responses = await Promise.all(rolePromises);

                // Fusionar los menús
                const allMenuItems = responses.flatMap(response => response.data);
                // const uniqueMenuItems = mergeMenuItems(allMenuItems);

                // Transformar los datos para el componente
                const transformedData = transformMenuData(allMenuItems);
                setMenuData(transformedData);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, [roles]);

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

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Barra superior */}
            <header className="bg-[#0e9343] text-gray-800 flex justify-between items-center shadow-md z-50 fixed w-full top-0 left-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-green-800 text-white transition-all ml-4"
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
                        <div
                            onClick={toggleDropdown}
                            className="cursor-pointer flex items-center md:space-x-4 mr-8 rounded hover:bg-green-800 px-4 py-1 transition-all"
                        >
                            <div className="text-right">
                                <span className="block font-semibold text-xs md:text-base text-white">
                                    {userName}
                                </span>
                                <span className="block font-semibold text-xs md:text-sm text-gray-200">
                                    {capitalizeWords(selectedRole)}
                                </span>
                                {/* <span className="block font-semibold text-xs md:text-sm text-gray-200">
                                    {roles.map(role => `${capitalizeWords(role.nombre)}`).join(', ')}
                                </span> */}
                            </div>
                            <img
                                src={userPhoto}
                                alt="Foto de perfil"
                                className="rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center text-gray-800 font-semibold border-2 border-green-600 object-cover"
                            />
                        </div>
                    )}

                    {isDropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                            <div
                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                <select
                                    className=" block w-full py-2 px-3  text-pretty md:text-md font-medium rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:border-none"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
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
                    <aside
                        className={`bg-gray-100 text-gray-950 py-6 px-2 z-30 space-y-6 w-56 h-full fixed transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full'
                            } border-r-2 border-gray-200 overflow-y-scroll pb-20`}
                        style={{
                            minHeight: `calc(100vh - 4rem)`, // Altura mínima dinámica (100% del viewport menos el header)
                        }}
                    >
                        <SidebarMenu menuData={menuData} />
                    </aside>

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

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
