import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuItem from './MenuItem';

const SidebarMenu = ({ menuData, roles }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    // Filtrar y estructurar el menú basado en roles
    const filteredMenu = menuData
        .filter(option =>
            option.roles.some(role => roles.includes(role) || role === 0)
        )
        .map(option => ({
            ...option,
            href: option.subOptions.length > 0 ? null : option.href,
            subOptions: option.subOptions.filter(subOption =>
                subOption.roles.some(role => roles.includes(role) || role === 0)
            ),
        }))
        .filter(option => option.href || option.subOptions.length > 0);

    return (
        <nav className="space-y-4">
            {filteredMenu.map((item, index) => (
                <MenuItem
                    key={index}
                    item={item}
                    isOpen={openMenuIndex === index}
                    toggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                />
            ))}
        </nav>
    );
};

SidebarMenu.propTypes = {
    menuData: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
};

export default SidebarMenu;
