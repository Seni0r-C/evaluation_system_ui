import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SubMenuItem from './SubMenuItem';

const MenuItem = ({ item, isOpen, toggle }) => {
    const location = useLocation();

    // Verifica si este es el enlace seleccionado
    const isSelected = item.href === location.pathname;

    return (
        <div>
            {item.href ? (
                // Opción principal con href
                <Link
                    to={item.href}
                    className={`flex items-center py-2 px-4 rounded-md transition-colors flex-1 justify-start gap-4 hover:scale-105 hover:shadow-md hover:bg-gray-200 ${isSelected ? 'hover:bg-gray-700 bg-gray-700 text-white' : ''
                        }`}
                >
                    {item.icon}{item.name}
                </Link>
            ) : (
                // Opción principal sin href (con subopciones)
                <div
                    className={`flex items-center py-2 px-4 rounded-md cursor-pointer justify-start gap-4 hover:scale-105 hover:shadow-md hover:bg-gray-200 transition-transform ${isOpen ? 'bg-gray-200' : ''
                        }`}
                    onClick={toggle}
                >
                    {item.icon}{item.name}
                    <span className="ml-2">
                        {isOpen ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                    </span>
                </div>
            )}

            {/* Subopciones */}
            {item.subOptions.length > 0 && isOpen && (
                <div className="ml-4">
                    {item.subOptions.map((subItem, subIndex) => (
                        <SubMenuItem key={subIndex} subItem={subItem} />
                    ))}
                </div>
            )}
        </div>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default MenuItem;
