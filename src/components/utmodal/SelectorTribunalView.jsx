/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import PropTypes from "prop-types";

const SelectorTribunalView = ({ children, selectedTribunal, setSelectedTribunal }) => {
    // Selector Docentes
    const quienPrecideKey = "Quien precide";
    const [selectedquienPrecide, setSelectedQuienPrecide] = useState([]);
    const suplenteMiembroTribunalKey = "Suplente de miembro de tribunal";
    const [selectedSuplenteMiembroTribunal, setSelectedSuplenteMiembroTribunal] = useState([]);
    const delgadoConsejoDirectivoKey = "DELEGADO H. CONSEJO DIRECTIVO";
    const [selectedDelegadoConsejoDirectivo, setSelectedDocenteDelegadoConsejoDirectivo] = useState([]);
    const docenteDelAreaKey = "DOCENTE DEL ÁREA";
    const [selectedDocenteDelArea, setSelectedDocenteDelArea] = useState([]);
    const delegadoComisionInvestigacionKey = "DELEGADO COM. INVESTIGACIÓN CIENTIFÍCA";
    const [selectedDelegadoComisionInvestigacion, setSelectedDelegadoComisionInvestigacion] = useState([]);

    const prepareTribunal = (selectedTribunal) => {
        // Quien Preside (qpreside, usually vicedecano), 
        // DELEGADO H. CONSEJO DIRECTIVO (consejo), 
        // DOCENTE DEL ÁREA (docente), 
        // DELEGADO COM. INVESTIGACIÓN CIENTIFÍCA (comision)
        if (selectedTribunal.length === 5) {
            const [qpreside, suplente, consejo, docente, comision] = selectedTribunal;
            // Actualiza solo si los valores realmente cambiaron
            if (
                JSON.stringify(selectedquienPrecide) !== JSON.stringify([qpreside])
            ) {
                setSelectedQuienPrecide([qpreside]);
            }

            if (
                JSON.stringify(selectedSuplenteMiembroTribunal) !== JSON.stringify([suplente])
            ) {
                setSelectedSuplenteMiembroTribunal([suplente]);
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
    }

    const loadCombinedTribunal = (combinedTribunal) => {
        combinedTribunal[0] = selectedquienPrecide[0] || null;
        combinedTribunal[1] = selectedSuplenteMiembroTribunal[0] || null;
        combinedTribunal[2] = selectedDelegadoConsejoDirectivo[0] || null;
        combinedTribunal[3] = selectedDocenteDelArea[0] || null;
        combinedTribunal[4] = selectedDelegadoComisionInvestigacion[0] || null;
    }

    useEffect(() => {
        const combinedTribunal = [];
        loadCombinedTribunal(combinedTribunal);

        const isNull = combinedTribunal.every((item) => item === null);
        if (isNull) {
            prepareTribunal(selectedTribunal);
        }

        const isEqual = selectedTribunal[0] === combinedTribunal[0] &&
            selectedTribunal[1] === combinedTribunal[1] &&
            selectedTribunal[2] === combinedTribunal[2] &&
            selectedTribunal[3] === combinedTribunal[3] &&
            selectedTribunal[4] === combinedTribunal[4];

        // Evita actualizar si los arrays son iguales
        if (!isEqual) {
            setSelectedTribunal(combinedTribunal);
        }
    }, [
        selectedquienPrecide,
        selectedSuplenteMiembroTribunal,
        selectedDelegadoConsejoDirectivo,
        selectedDocenteDelArea,
        selectedDelegadoComisionInvestigacion,
        selectedTribunal
    ]);

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start',
                // alignItems: 'center', 
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '10px',
            }}>
                {children}

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
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
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
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
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
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <BuscadorDocentes
                        key={suplenteMiembroTribunalKey}
                        label="Suplente de miembro de tribunal"
                        setSelectedDocentes={setSelectedSuplenteMiembroTribunal}
                        initialSelectedItems={selectedSuplenteMiembroTribunal}
                        allowDuplicates={false}
                        maxSelections={1}
                        required={true}
                    />
                </div>
            </div>
        </>
    );
};

SelectorTribunalView.propTypes = {
    setSelectedTribunal: PropTypes.func.isRequired,
    selectedTribunal: PropTypes.array.isRequired
};

export default SelectorTribunalView;
