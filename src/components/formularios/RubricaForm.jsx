import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RubricaForm = ({ onCreate, onUpdate, selected }) => {
    const [nombre, setNombre] = useState('');
    const [tipoEvaluacionId, setTipoEvaluacionId] = useState('');

    useEffect(() => {
        if (selected) {
            setNombre(selected.nombre);
            setTipoEvaluacionId(selected.tipo_evaluacion_id);
        } else {
            setNombre('');
            setTipoEvaluacionId('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nombre, tipo_evaluacion_id: tipoEvaluacionId };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setNombre('');
        setTipoEvaluacionId('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre de la rúbrica"
            />
            <input
                type="text"
                value={tipoEvaluacionId}
                onChange={(e) => setTipoEvaluacionId(e.target.value)}
                className="border p-2 mr-2"
                placeholder="ID del tipo de evaluación"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    );
};

RubricaForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
};

export default RubricaForm;