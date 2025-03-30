/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ComboBox from "../common/ComboBox";

export const indexaciones = [
    { id: 1, name: "LatinIndex 60%", value: 60, porcentaje: 0.6 },
    { id: 2, name: "Scopus 80%", value: 80 , porcentaje: 0.8},
];

const ComboBoxIndexacionRevistas = ({ onSelect, selectedId=null }) => {

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
            selectedInitialItem = {selectedId}
        />
    );
};

export default ComboBoxIndexacionRevistas;
