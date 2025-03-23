/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import PropTypes from "prop-types";

const SelectorTribunalView = ({ selectedTribunal, setSelectedTribunal }) => {
    // Selector Docentes
    const quienPrecideKey = "Quien precide";
    const [selectedquienPrecide, setSelectedQuienPrecide] = useState([]);
    const delgadoConsejoDirectivoKey = "DELEGADO H. CONSEJO DIRECTIVO";
    const [selectedDelegadoConsejoDirectivo, setSelectedDocenteDelegadoConsejoDirectivo] = useState([]);
    const docenteDelAreaKey = "DOCENTE DEL ÁREA";
    const [selectedDocenteDelArea, setSelectedDocenteDelArea] = useState([]);
    const delegadoComisionInvestigacionKey = "DELEGADO COM. INVESTIGACIÓN CIENTIFÍCA";
    const [selectedDelegadoComisionInvestigacion, setSelectedDelegadoComisionInvestigacion] = useState([]);


    useEffect(() => {
        const combinedTribunal = [
            ...selectedquienPrecide,
            ...selectedDelegadoConsejoDirectivo,
            ...selectedDocenteDelArea,
            ...selectedDelegadoComisionInvestigacion
        ];

        // Evita actualizar si los arrays son iguales
        if (JSON.stringify(selectedTribunal) !== JSON.stringify(combinedTribunal)) {
            setSelectedTribunal(combinedTribunal);
        }
    }, [
        selectedquienPrecide,
        selectedDelegadoConsejoDirectivo,
        selectedDocenteDelArea,
        selectedDelegadoComisionInvestigacion
    ]);

    useEffect(() => {
        // Quien Preside (qpreside, usually vicedecano), 
        // DELEGADO H. CONSEJO DIRECTIVO (consejo), 
        // DOCENTE DEL ÁREA (docente), 
        // DELEGADO COM. INVESTIGACIÓN CIENTIFÍCA (comision)
        alert(JSON.stringify(selectedTribunal, null, 2));
        if (selectedTribunal.length === 4) {
            const [qpreside, consejo, docente, comision] = selectedTribunal;

            // Actualiza solo si los valores realmente cambiaron
            if (
                JSON.stringify(selectedquienPrecide) !== JSON.stringify([qpreside])
            ) {
                setSelectedQuienPrecide([qpreside]);
            }
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <BuscadorDocentes
                    key={quienPrecideKey}
                    label="Quien precide el tribunal"
                    setSelectedDocentes={setSelectedQuienPrecide}
                    initialSelectedItems={selectedquienPrecide}
                    allowDuplicates={false}
                    maxSelections={1}
                    required={true}
                />
                <BuscadorDocentes
                    key={delgadoConsejoDirectivoKey}
                    label="Delegado H. Consejo Directivo"
                    setSelectedDocentes={setSelectedDocenteDelegadoConsejoDirectivo}
                    initialSelectedItems={selectedDelegadoConsejoDirectivo}
                    allowDuplicates={false}
                    maxSelections={1}
                    required={true}
                />
            </div>
    
            <div style={{ display: 'flex', gap: '10px' }}>
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
            </div>
        </div>
    );    
};

SelectorTribunalView.propTypes = {
    setSelectedTribunal: PropTypes.func.isRequired,
    selectedTribunal: PropTypes.array.isRequired
};

export default SelectorTribunalView;
