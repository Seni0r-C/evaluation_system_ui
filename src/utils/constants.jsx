import { FaEdit, FaHome } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
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
        name: 'Inicio',
        href: RutaRaiz,
        roles: [0], // Disponible para todos los roles
        subOptions: [],
        icon: <FaHome />
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
        icon: <FaEdit />
    },
];