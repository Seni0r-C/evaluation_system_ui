import { FaHome, FaUsers, FaFileAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { GrDocumentUpload } from "react-icons/gr";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import { TODOS } from "../utils/roles";
import { permisos } from "../utils/permisos";

// export const API_URL = "http://localhost:3000";
export const API_URL = "https://utm.portocomercio.gob.ec";

export const RutaRaiz = "/";

export const VERSION = "0.0.1";

export function capitalizeWords(str) {
    str = str.toLowerCase();
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Convierte una fecha MySQL a formato "dd/MM/yyyy, HH:mm"
 * @param {string} date - Fecha en formato ISO de MySQL (ej. "2025-01-15T05:00:00.000Z")
 * @returns {string} Fecha formateada como "15/01/2025, 05:00"
 */
export const hourAndDateFromDateTimeMySQL = (date) => {
    try {
        const parts = date.split(",");
        const dtparts = parts[0].trim().split("/");
        const day = dtparts[0];
        const month = dtparts[1];
        const year = dtparts[2];
        const time = parts[1].trim();
        return `${year}-${month}-${day}T${time}`;
    } catch (Exception) {
        return '';
    }
};

export const menuData = [
    {
        name: 'Inicio',
        href: RutaRaiz,
        roles: [TODOS], // Disponible para todos los roles
        subOptions: [],
        icon: <FaHome />
    },
    {
        name: 'Items y Modalidades',
        roles: [TODOS], // Disponible para todos los roles
        subOptions: [

            {
                name: 'Modalidades de Titulación',
                href: '/modalidades',
                roles: permisos.ROLES_EDICION_MODALIDADES,
                subOptions: [],
                icon: <MdOutlineChromeReaderMode />
            },
            {
                name: 'Items de revista',
                href: '/items-revista',
                roles: permisos.ROLES_EDICION_ITEMS_REVISTA,
                subOptions: [],
                icon: <FaListCheck />
            },
            {
                name: 'Items de rúbrica',
                href: '/items-rubrica',
                roles: permisos.ROLES_EDICION_ITEMS_RUBRICA,
                subOptions: [],
                icon: <FaListCheck />
            },
        ],
        icon: <MdOutlineChromeReaderMode />
    },
    {
        name: 'Registro Trabajo',
        href: '/registro-proyecto-titulacion',
        roles: permisos.ROLES_REGISTRO_TRABAJO, // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <GrDocumentUpload />
    },
    {
        name: 'Asignación Tribunal',
        href: '/asignacion-de-tribunal',
        roles: permisos.ROLES_ASIGNACION_TRIBUNAL, // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaUsers />
    },
    {
        name: 'Calificación Trabajos',
        href: '/calificacion-de-trabajo-titulacion',
        roles: permisos.ROLES_CALIFICACION_TRABAJOS, // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <GrDocumentUpload />
    },
    {
        name: 'Documento calificación',
        href: '/generacion-de-documento',
        roles: permisos.ROLES_GENERACION_DOCUMENTO_CALIFICACION, // Disponible solo para el rol 1 (Administrador)
        subOptions: [],
        icon: <FaFileAlt />
    },
];
// export const menuData = [
//     {
//         name: 'Asignación Tribunal',
//         href: '/asignacion-de-tribunal',
//         roles: [1], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <FaUsers />
//     },
//     {
//         name: 'Documento calificación',
//         href: '/generacion-de-documento',
//         roles: [1], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <FaFileAlt />
//     },
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
//     {
//         name: 'Calificación Trabajos',
//         href: '/calificacion-de-trabajo-titulacion',
//         roles: [1, 2], // Disponible solo para el rol 1 (Administrador)
//         subOptions: [],
//         icon: <GrDocumentUpload />
//     },
// ];

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