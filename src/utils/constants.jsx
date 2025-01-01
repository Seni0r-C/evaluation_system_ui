import { FaCalendarAlt, FaHome, FaUsers, FaFileAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { GrDocumentUpload } from "react-icons/gr";
import { HiDocumentSearch } from "react-icons/hi";
import { MdOutlineChromeReaderMode } from "react-icons/md";

export const API_URL = "http://localhost:3000";

export const RutaRaiz = "/";

export const VERSION = "0.0.1";

export function capitalizeWords(str) {
    str = str.toLowerCase();
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const menuData = [
    {
        name: 'Asignación Tribunal',
        href: '/asignacion-de-tribunal',
        roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaUsers />
    },
    {
        name: 'Documento calificación',
        href: '/generacion-de-documento',
        roles: [1], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaFileAlt />
    },
    {
        name: 'Inicio',
        href: RutaRaiz,
        roles: [0], // Disponible para todos los roles
        subOptions: [],
        icon: <FaHome />
    },
    {
        name: 'Lista de Trabajos',
        href: '/trabajos-titulacion',
        roles: [0], // Disponible para ambos roles
        subOptions: [],
        icon: <HiDocumentSearch />
    },
    {
        name: 'Calenario de Eventos',
        href: '/calendario',
        roles: [0], // Disponible para ambos roles
        subOptions: [],
        icon: <FaCalendarAlt />
    },
    {
        name: 'Modalidades de Titulación',
        href: '/modalidades',
        roles: [1], // Disponible para ambos roles
        subOptions: [],
        icon: <MdOutlineChromeReaderMode />
    },
    {
        name: 'Items de revista',
        href: '/items-revista',
        roles: [1], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaListCheck />

    },
    {
        name: 'Items de rúbrica',
        href: '/items-rubrica',
        roles: [1], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaListCheck />

    },
    {
        name: 'Registro Trabajo',
        href: '/registro-proyecto-titulacion',
        roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <GrDocumentUpload />
    },
    {
        name: 'Calificación Trabajos',
        href: '/calificacion-de-trabajo-titulacion',
        roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <GrDocumentUpload />
    },  
];

// export const menuData = [
//     {
//         name: 'Inicio',
//         href: RutaRaiz,
//         roles: [0], // Disponible para todos los roles
//         subOptions: [],
//         icon: <FaHome />
//     },
//     {
//         name: 'Lista de Trabajos',
//         href: '/trabajos-titulacion',
//         roles: [0], // Disponible para ambos roles
//         subOptions: [],
//         icon: <HiDocumentSearch />
//     },
//     {
//         name: 'Calenario de Eventos',
//         href: '/calendario',
//         roles: [0], // Disponible para ambos roles
//         subOptions: [],
//         icon: <FaCalendarAlt />
//     },
//     {
//         name: 'Modalidades de Titulación',
//         href: '/modalidades',
//         roles: [1], // Disponible para ambos roles
//         subOptions: [],
//         icon: <MdOutlineChromeReaderMode />
//     },
//     {
//         name: 'Items de revista',
//         href: '/items-revista',
//         roles: [1], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <FaListCheck />

//     },
//     {
//         name: 'Items de rúbrica',
//         href: '/items-rubrica',
//         roles: [1], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <FaListCheck />

//     },
//     {
//         name: 'Registro Trabajo',
//         href: '/registro-proyecto-titulacion',
//         roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <GrDocumentUpload />
//     },
// ];