import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuItem from './MenuItem';

const getPermissionId = (item) => {
    // return item?.name == "Menu" || item?.name == "Administrar Sistema"? "ver_panel_admin_hide" : null;
    return item?.name == "Menu" ? "ver_panel_admin_hide" : null;
};

const SidebarMenu = ({ menuData }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    return (
        <nav className="space-y-2" aria-label="Menú lateral">
            {menuData.map((item, index) => (
                <MenuItem
                    key={index}
                    item={item}
                    permissionId={getPermissionId(item)}
                    isOpen={openMenuIndex === index}
                    toggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                />
            ))}
        </nav>
    );
};

SidebarMenu.propTypes = {
    menuData: PropTypes.array.isRequired,
};

export default SidebarMenu;
