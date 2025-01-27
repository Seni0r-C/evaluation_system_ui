import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuItem from './MenuItem';

const SidebarMenu = ({ menuData }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    
    return (
        <nav className="space-y-2">
            {menuData.map((item, index) => (
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
};

export default SidebarMenu;
