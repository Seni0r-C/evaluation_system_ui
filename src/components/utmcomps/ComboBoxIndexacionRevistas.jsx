import { useState } from "react";
import ComboBox from "../common/ComboBox";

const indexaciones = [
    { id: 1, name: "LatinIndex 60%", value: 0.6 },
    { id: 2, name: "Scopus 80%", value: 0.8 }
];

const ComboBoxIndexacionRevistas = ({ onSelect }) => {
    const [selectedIndexacion, setSelectedIndexacion] = useState(null);

    const handleSelection = (item) => {
        setSelectedIndexacion(item);
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
        // <div>
        //     {selectedIndexacion && (
        //         <p>
        //             <strong>Seleccionado:</strong> {selectedIndexacion.name} (Valor: {selectedIndexacion.value})
        //         </p>
        //     )}
        // </div>
    );
};

export default ComboBoxIndexacionRevistas;
