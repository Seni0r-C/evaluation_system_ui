import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuItem from './MenuItem';

// SliderMenu -> Slider menu [x], key=base64(id+compName)

// DB:
// {
//     id: 1,
//     querySelector: "ver_panel_admin",
//     component_name = "AdminMenu",
//     name = "admin menu",
// }

// With querySelector assign the permissionId when the u

// permission_id = base64(id+component_name),

// 1. selector -> Give a permissionId (permissionId save it in DB) (example view a "name" button)
// permissionsId = [
//     "ver_panel_admin",
//     "ver_boton_descargar",
//     "ver_tabla_usuarios",
//     "ver_tabla_usuarios.ver_columna"
// ] 

const getPermissionId = (item) => {
    // return item?.name == "Menu" || item?.name == "Administrar Sistema"? "ver_panel_admin_hide" : null;
    return item?.name == "Menu" ? "ver_panel_admin_hide" : null;
};

const SidebarMenu = ({ menuData }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    return (
        <nav className="space-y-2">
            {menuData.map((item, index) => (
                <>
                    {
                        getPermissionId(item) &&
                        <MenuItem
                            permissionId={getPermissionId(item)}
                            key={index}
                            item={item}
                            // permissionId={item.permissionId}
                            isOpen={openMenuIndex === index}
                            toggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                        />
                    }
                    {
                        !getPermissionId(item) &&
                        <MenuItem
                            key={index}
                            item={item}
                            // permissionId={item.permissionId}
                            isOpen={openMenuIndex === index}
                            toggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                        />
                    }
                </>
            ))}
        </nav>
    );
};

SidebarMenu.propTypes = {
    menuData: PropTypes.array.isRequired,
};

export default SidebarMenu;
