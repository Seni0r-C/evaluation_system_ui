/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import PropTypes from "prop-types";

const SelectorTribunalModal = ({ selectedTribunal, setSelectedTribunal }) => {
    // Selector Docentes
    const delgadoConsejoDirectivoKey = "DELEGADO H. CONSEJO DIRECTIVO";
    const [selectedDelegadoConsejoDirectivo, setSelectedDocenteDelegadoConsejoDirectivo] = useState([]);
    const docenteDelAreaKey = "DOCENTE DEL ÁREA";
    const [selectedDocenteDelArea, setSelectedDocenteDelArea] = useState([]);
    const delegadoComisionInvestigacionKey = "DELEGADO COM. INVESTIGACIÓN CIENTIFÍCA";
    const [selectedDelegadoComisionInvestigacion, setSelectedDelegadoComisionInvestigacion] = useState([]);


    useEffect(() => {
        const combinedTribunal = [
            ...selectedDelegadoConsejoDirectivo,
            ...selectedDocenteDelArea,
            ...selectedDelegadoComisionInvestigacion
        ];

        // Evita actualizar si los arrays son iguales
        if (JSON.stringify(selectedTribunal) !== JSON.stringify(combinedTribunal)) {
            setSelectedTribunal(combinedTribunal);
        }
    }, [
        selectedDelegadoConsejoDirectivo,
        selectedDocenteDelArea,
        selectedDelegadoComisionInvestigacion
    ]);

    useEffect(() => {
        if (selectedTribunal.length === 3) {
            const [consejo, docente, comision] = selectedTribunal;

            // Actualiza solo si los valores realmente cambiaron
            if (
                JSON.stringify(selectedDelegadoConsejoDirectivo) !== JSON.stringify([consejo])
            ) {
                setSelectedDocenteDelegadoConsejoDirectivo([consejo]);
            }
            if (
                JSON.stringify(selectedDocenteDelArea) !== JSON.stringify([docente])
            ) {
                setSelectedDocenteDelArea([docente]);
            }
            if (
                JSON.stringify(selectedDelegadoComisionInvestigacion) !== JSON.stringify([comision])
            ) {
                setSelectedDelegadoComisionInvestigacion([comision]);
            }
        }
    }, [selectedTribunal]);

    return (
        <>
            <BuscadorDocentes
                key={delgadoConsejoDirectivoKey}
                label="Delegado H. Consejo Directivo"
                setSelectedDocentes={setSelectedDocenteDelegadoConsejoDirectivo}
                initialSelectedItems={selectedDelegadoConsejoDirectivo}
                allowDuplicates={false}
                maxSelections={1}
                required={true}
            />
            <BuscadorDocentes
                key={docenteDelAreaKey}
                label="Docente del Área"
                setSelectedDocentes={setSelectedDocenteDelArea}
                initialSelectedItems={selectedDocenteDelArea}
                allowDuplicates={false}
                maxSelections={1}
                required={true}
            />
            <BuscadorDocentes
                key={delegadoComisionInvestigacionKey}
                label="Delegado Com. Investigación Científica"
                setSelectedDocentes={setSelectedDelegadoComisionInvestigacion}
                initialSelectedItems={selectedDelegadoComisionInvestigacion}
                allowDuplicates={false}
                maxSelections={1}
                required={true}
            />
        </>
    );
};

SelectorTribunalModal.propTypes = {
    setSelectedTribunal: PropTypes.func.isRequired,
    selectedTribunal: PropTypes.array.isRequired
};

export default SelectorTribunalModal;
