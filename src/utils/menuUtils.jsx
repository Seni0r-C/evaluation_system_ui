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
        };
        if (item.padre) {
            // Si tiene un padre, es un submenú
            subMenus.push({ ...menuItem, parentId: item.padre });
        } else {
            // Si no tiene un padre, es un menú principal
            menuById[item.orden] = menuItem;
        }
    });

    // Asociar los submenús a sus padres
    subMenus.forEach(subMenu => {
        if (menuById[subMenu.parentId]) {
            menuById[subMenu.parentId].subOptions.push(subMenu);
        }
    });

    // Convertir a un array y filtrar los elementos no válidos
    const filteredMenu = Object.values(menuById).filter(menuItem => {
        // Filtro para los elementos principales
        return menuItem.href || menuItem.subOptions.length > 0;
    });

    // Filtrar también los subOptions de cada menú
    filteredMenu.forEach(menuItem => {
        menuItem.subOptions = menuItem.subOptions.filter(subOption => {
            return subOption.href || subOption.subOptions.length > 0;
        });
    });

    return filteredMenu;

};

const getIcon = (iconName) => {
    const iconsMap = {
        home: <FaHome />,
        items: <MdOutlineChromeReaderMode />,
        subir: <GrDocumentUpload />,
        asignar: <FaUsers />,
        calificar: <FaListCheck />,
        reporte: <FaFileAlt />,
    };
    return iconsMap[iconName] || null;
};