import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const SubMenuItem = ({ subItem }) => {
    const location = useLocation();

    // Verifica si este subitem está seleccionado
    const isSelected = subItem.href === location.pathname;

    return (
        <Link
            to={subItem.href}
            className={`mt-2 text-sm block p-2 rounded-md transition-colors  hover:scale-105 hover:shadow-md hover:bg-gray-200 ${
                isSelected ? 'hover:bg-gray-700 bg-gray-700 text-white' : ''
            }`}
        >
            {subItem.name}
        </Link>
    );
};

SubMenuItem.propTypes = {
    subItem: PropTypes.object.isRequired,
};

export default SubMenuItem;
