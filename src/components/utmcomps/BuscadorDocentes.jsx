/* eslint-disable react/prop-types */
import SearchDropdown from '../common/BuscadorGenerico';
import { buscarUsuarios as buscarUsuariosService } from '../../services/usuarioService';

const BuscadorDocentes = ({ setSelectedDocentes, initialSelectedItems = [], allowDuplicates = false, maxSelections = -1, required = false, label = "Buscar Docentes" }) => {
    const handleBuscarNombre = (query, setResults, setShowSpinner) => {
        setShowSpinner(true);  // Mostrar el spinner
        setTimeout(() => {
            //rol de docente = 3
            buscarUsuariosService(query, setResults, 3);
            setShowSpinner(false);  // Ocultar el spinner cuando se obtienen los resultados
        }, 500);  // Simulamos un retraso en la búsqueda
    };
    return (
        <div className="p-1">
            {/* Buscador de Docentes */}
            <SearchDropdown
                label={label}
                placeholder="Nombres apellidos del docente"
                handlerBuscar={handleBuscarNombre}
                onSelectionChange={(items) => setSelectedDocentes(items)}
                allowDuplicates={allowDuplicates}
                maxSelections={maxSelections}
                required={required}
                initialSelectedItems={initialSelectedItems}
            />
        </div>
    );
};

export default BuscadorDocentes;