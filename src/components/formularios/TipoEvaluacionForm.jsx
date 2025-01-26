import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TipoEvaluacionForm = ({ onCreate, onUpdate, selected }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (selected) {
            setNombre(selected.nombre);
        } else {
            setNombre('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nombre };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setNombre('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre del tipo de evaluación"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    );
};

TipoEvaluacionForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object
};

export default TipoEvaluacionForm;