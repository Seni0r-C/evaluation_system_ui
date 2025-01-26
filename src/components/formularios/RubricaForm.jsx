import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RubricaForm = ({ onCreate, onUpdate, selected, setSelected, modalidades, tipoEvaluaciones }) => {
    const [modalidadId, setModalidadId] = useState('');
    const [tipoEvaluacionId, setTipoEvaluacionId] = useState('');

    useEffect(() => {
        if (selected) {
            setModalidadId(selected[0].modalidad_id);
            setTipoEvaluacionId(selected[0].tipo_evaluacion_id);
        } else {
            setModalidadId('');
            setTipoEvaluacionId('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { modalidad_id: modalidadId, tipo_evaluacion_id: tipoEvaluacionId };
        if (selected) {
            onUpdate(selected[0].rubrica_id, data);
        } else {
            onCreate(data);
        }
        setModalidadId('');
        setTipoEvaluacionId('');
        setSelected(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <select name="modalidad_id" value={modalidadId} onChange={(e) => setModalidadId(e.target.value)} className="border p-2 mr-2" required>
                <option value="">Seleccione una modalidad</option>
                {modalidades.map((modalidad) => (
                    <option key={modalidad.id} value={modalidad.id}>
                        {modalidad.nombre}
                    </option>
                ))}
            </select>
            <select name="tipo_evaluacion_id" value={tipoEvaluacionId} onChange={(e) => setTipoEvaluacionId(e.target.value)} className="border p-2 mr-2" required>
                <option value="">Seleccione un tipo de evaluación</option>
                {tipoEvaluaciones.map((tipoEvaluacion) => (
                    <option key={tipoEvaluacion.id} value={tipoEvaluacion.id}>
                        {tipoEvaluacion.nombre}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
            {
                selected && (
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 ml-2"
                        onClick={() => setSelected(null)}
                    >
                        Cancelar
                    </button>
                )
            }
        </form>
    );
};

RubricaForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    modalidades: PropTypes.array.isRequired,
    tipoEvaluaciones: PropTypes.array.isRequired
};

export default RubricaForm;