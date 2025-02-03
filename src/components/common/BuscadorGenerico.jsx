import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearchPlus } from 'react-icons/fa';
import Spinner from '../shared/logo_carga/Spinner';
import { useMessage } from "../../hooks/useMessage";


const BuscadorGenerico = ({
  label,
  placeholder,
  handlerBuscar,
  subSearchHandlers = [],
  onSelectionChange,
  allowDuplicates = false,
  maxSelections = 1,
  required = false,
  initialSelectedItems = [],
  showMessageMap = {
    maxSelectionError: { typeMsg: 'warning', message: 'Se ha alcanzado el límite de selecciones permitidas (' + maxSelections + ').' },
    duplicateError: { typeMsg: 'warning', message: 'No se permiten duplicados.' }
  }
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchedMessage, setSearchedMessage] = useState("Escriba para empezar la búsqueda.");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false); // Controla el despliegue
  const [subSearchValues, setSubSearchValues] = useState(
    subSearchHandlers.reduce((acc, field) => {
      acc[field.label] = '';
      return acc;
    }, {})
  );

  // Messages showMesageMap
  const { showMsg } = useMessage();

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
  }, [initialSelectedItems]);

  const resetTextBoxs = () => {
    setSearchValue('');
    setSubSearchValues('');
  };

  const handleButtonDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleButtonAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch)
  };
  // Manejar cambio en el campo principal
  const handleSearchChange = (value, handler) => {
    resetTextBoxs();
    setSearchedMessage("No hay resultados disponibles.");
    setSearchValue(value);
    setShowSpinner(true);
    handler(value, setSearchResults, setShowSpinner);
    setShowDropdown(true);
  };

  // Manejar cambio en los campos adicionales
  const handleSubSearchChange = (label, value, handler) => {
    resetTextBoxs();
    setSubSearchValues((prev) => ({ ...prev, [label]: value }));
    setShowSpinner(true);
    handler(value, setSearchResults, setShowSpinner);
    setShowDropdown(true);
  };

  const hasMaxSelections = () => {
    const hasMaxSelections = maxSelections !== -1 && selectedItems.length >= maxSelections;
    if (hasMaxSelections && showMessageMap !== null) {
      showMsg(showMessageMap.maxSelectionError)
    }
    return hasMaxSelections;
  };

  const wouldHaveDuplicates = (item) => {
    const hasDuplicates = !allowDuplicates && selectedItems.some((selected) => selected.id === item.id);
    if (hasDuplicates && showMessageMap !== null) {
      showMsg(showMessageMap.duplicateError)
    }
    return hasDuplicates;
  };

  // Manejar selección de un ítem
  const handleItemSelect = (item) => {
    if (hasMaxSelections()) return;
    if (wouldHaveDuplicates(item)) return;

    const updatedItems = [...selectedItems, item];
    setSelectedItems(updatedItems);
    onSelectionChange(updatedItems);
    setSearchValue('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  // Remover un ítem seleccionado
  const handleRemoveItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
    onSelectionChange(updatedItems);
  };

  
  return (
    <div className="mb-4 relative">
      {/* Etiqueta del campo */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* Campo principal con botón más grande */}
      <div className="relative flex items-center border rounded-md overflow-hidden">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value, handlerBuscar)}
          placeholder={placeholder}
          className="w-full border-none px-3 py-2 focus:outline-none"
          required={required}
        />
        {/* Botón para mostrar campos adicionales */}
        {subSearchHandlers.length > 0 && (
          <button
            onClick={handleButtonAdvancedSearch}
            className={`p-3 border-l text-lg ${showAdvancedSearch ? 'bg-green-700 text-green-100 hover:bg-green-700' : 'bg-green-300 hover:bg-green-400'}`}
          >
            <FaSearchPlus />
          </button>
        )}
        {/* Botón para resultados de búsquedas */}
        <button
          onClick={handleButtonDropdown}
          className="p-3 border-l bg-gray-100 hover:bg-gray-200 text-lg"
        >
          {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </button>

      </div>

      {/* Campos adicionales solo cuando showAdvancedSearch está activo */}
      {
        showAdvancedSearch &&
        subSearchHandlers.map((search, index) => (
          <div key={index} className={`mt-2 ${search.layout === 'inline' ? 'flex' : 'block'}`}>
            <input
              type="text"
              placeholder={search.label}
              value={subSearchValues[search.label]}
              onChange={(e) => handleSubSearchChange(search.label, e.target.value, search.handler)}
              className="w-full border px-3 py-2 rounded-md focus:outline-none"
            />
          </div>
        ))
      }

      {/* Spinner de carga */}
      {
        showSpinner && (
          <div className="absolute left-0 w-full p-3 text-center bg-white border">
            <Spinner />
          </div>
        )
      }

      {/* Resultados del buscador */}
      {
        showDropdown && searchResults.length > 0 && (
          <ul className="absolute border rounded-lg bg-white w-full max-h-40 overflow-auto z-10 mt-1 shadow-lg">
            {searchResults.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${highlightedIndex === index ? 'bg-gray-100' : ''
                  }`}
                onClick={() => handleItemSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {item.nombre || item.title || item.name}
              </li>
            ))}
          </ul>
        )
      }
      {
        showDropdown && searchResults.length <= 0 && (
          <ul className="absolute border rounded-lg bg-white w-full max-h-40 overflow-auto z-10 mt-1 shadow-lg">
            <li
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100`}
            >
              {searchedMessage}
            </li>
          </ul>
        )
      }

      {/* Ítems seleccionados */}
      {
        selectedItems.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center bg-green-100 text-gray-700 px-3 py-1 rounded-full"
              >
                <span className="mr-2">{item.nombre || item.title || item.name}</span>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
};

BuscadorGenerico.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handlerBuscar: PropTypes.func.isRequired,
  subSearchHandlers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
      layout: PropTypes.oneOf(['stacked', 'inline']),
    })
  ),
  onSelectionChange: PropTypes.func.isRequired,
  allowDuplicates: PropTypes.bool,
  maxSelections: PropTypes.number,
  required: PropTypes.bool,
  initialSelectedItems: PropTypes.array,
};

export default BuscadorGenerico;
