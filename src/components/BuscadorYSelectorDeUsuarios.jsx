import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Spinner from './LogoCarga/Spinner';
import { capitalizeWords } from '../utils/constants';

const BuscadorYSelectorDeUsuarios = ({
  label,
  optional,
  placeholder,
  searchValue,
  setSearchValue,
  searchResults,
  setSearchResults,
  selectedUser,
  selectedUSers,
  setSelectedUser,
  handleKeyDown,
  handleChipRemove,
  type, // para distinguir entre tutor y cotutor
  setHighlightedIndex,
  highlightedIndex,
  handleBuscar,
  required,
}) => {
  let showSpinner = false;

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    showSpinner = true;
    handleBuscar(searchValue, setSearchResults);
  };

  const handleButtonClick = () => {
    if (searchResults.length > 0) {
      setSearchResults([]);
      setSearchValue('');
      setHighlightedIndex(-1);
    } else {
      showSpinner = true;
      handleBuscar(searchValue, setSearchResults);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}{optional && <span className="text-gray-500 text-sm">(Opcional)</span>}
      </label>
      <div className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={(e) => handleKeyDown(e, type)}
            placeholder={placeholder}
            className="w-full border rounded-l px-3 py-2 mb-2"
            required={required ? ((type !== "estudiante" && selectedUser == null) || (type === "estudiante" && selectedUSers?.length <= 0)) : false}
          />
          <button
            onClick={handleButtonClick}
            type='button'
            className="bg-gray-200 border border-l-0 rounded-r px-3 py-3 mb-2 flex items-center justify-center hover:bg-gray-300 h-full"
          >
            {searchResults.length > 0 ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
          </button>
        </div>
        {(searchResults.length > 0 || showSpinner || searchValue) && (
          <ul className="absolute border rounded bg-white w-full max-h-40 overflow-auto z-10">
            {showSpinner ? (
              <div className="p-3 text-center">
                <Spinner />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user, index) => (
                <li
                  key={user.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${highlightedIndex === index ? "bg-gray-100" : ""}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => {
                    setSelectedUser(user);
                    setSearchValue("");
                    setSearchResults([]);
                    setHighlightedIndex(-1);
                  }}
                >
                  {capitalizeWords(user.nombre)}
                </li>
              ))
            ) : searchValue && (
              <div className="p-3 text-center text-red-500">
                No se encontraron resultados.
              </div>
            )}
          </ul>
        )}
      </div>
      {selectedUser && (
        <div className="flex items-center bg-green-100 text-gray-700 px-3 py-1 rounded-full mt-2 w-fit">
          <span className="mr-2">{capitalizeWords(selectedUser.nombre)}</span>
          <button
            onClick={() => handleChipRemove(type)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mostrar estudiantes seleccionados */}
      {selectedUSers && (
        <div className="mt-2">
          {selectedUSers.map((est) => (
            <div key={est.id} className="flex items-center bg-green-100 text-gray-700 px-3 py-1 rounded-full mt-1 w-fit">
              <span className="mr-2">{capitalizeWords(est.nombre)}</span>
              <button
                onClick={() => handleChipRemove('estudiante', est)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

BuscadorYSelectorDeUsuarios.propTypes = {
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  selectedUSers: PropTypes.array,
  setSelectedUser: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleChipRemove: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setHighlightedIndex: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  handleBuscar: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default BuscadorYSelectorDeUsuarios;
