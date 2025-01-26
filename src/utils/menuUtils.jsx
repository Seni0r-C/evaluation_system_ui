import { FaHome, FaUsers, FaFileAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { GrDocumentUpload } from "react-icons/gr";
import { MdOutlineChromeReaderMode } from "react-icons/md";

export const transformMenuData = (menuItems) => {
    const menuById = {}; // Para almacenar los menús principales
    const subMenus = []; // Para almacenar los submenús

    // Separar menús principales y submenús
    menuItems.forEach(item => {
        const menuItem = {
            name: item.menu_nombre,
            href: item.ruta || null,
            subOptions: [],
            icon: getIcon(item.icon),
            id: item.id,
            orden: item.orden
        };
        if (item.padre) {
            // Si tiene un padre, es un submenú
            subMenus.push({ ...menuItem, parentId: item.padre });
        } else {
            // Si no tiene un padre, es un menú principal
            menuById[item.id] = menuItem;
        }
    });

    // Asociar los submenús a sus padres
    subMenus.forEach(subMenu => {
        if (menuById[subMenu.parentId]) {
            menuById[subMenu.parentId].subOptions.push(subMenu);
        }
    });

    // Convertir a un array y ordenar por "orden"
    const sortedMenu = Object.values(menuById)
        .filter(menuItem => {
            // Filtro para los elementos principales
            return menuItem.href || menuItem.subOptions.length > 0;
        })
        .sort((a, b) => a.orden - b.orden); // Ordenar menús principales

    // Ordenar también los subOptions de cada menú
    sortedMenu.forEach(menuItem => {
        menuItem.subOptions = menuItem.subOptions
            .filter(subOption => {
                return subOption.href || subOption.subOptions.length > 0;
            })
            .sort((a, b) => a.orden - b.orden); // Ordenar submenús
    });

    return sortedMenu;
};

// Función para obtener el ícono como componente JSX
export const getIcon = (iconName) => {
    const IconComponent = iconsMap[iconName];
    return IconComponent ? <IconComponent /> : null;
};

// Mapa de íconos en un solo lugar
export const iconsMap = {
    home: FaHome,
    items: MdOutlineChromeReaderMode,
    subir: GrDocumentUpload,
    asignar: FaUsers,
    calificar: FaListCheck,
    reporte: FaFileAlt,
};