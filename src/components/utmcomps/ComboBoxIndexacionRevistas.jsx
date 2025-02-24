/* eslint-disable react/prop-types */
import ComboBox from "../common/ComboBox";

const indexaciones = [
    { id: 1, name: "LatinIndex 60%", value: 60, porcentaje: 0.75 },
    { id: 2, name: "Scopus 80%", value: 80 , porcentaje: 1},
];

const ComboBoxIndexacionRevistas = ({ onSelect }) => {

    const handleSelection = (item) => {
        onSelect && onSelect(item); // Devuelve el objeto seleccionado
    };

    return (
        <ComboBox 
            items={indexaciones} 
            displayKey="name"
            onSelect={handleSelection} 
            placeholder="Seleccione indexación:"
            borderColor="border-gray-400"
            bgColor="bg-gray-200"  // Asegura que el fondo sea consistente con los botones
            ringColor="focus:ring-gray-300" // Cambiar color del foco
        />
    );
};

export default ComboBoxIndexacionRevistas;
