import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RubricaCriterioForm = ({ onCreate, onUpdate, selected }) => {
    const [nombre, setNombre] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        if (selected) {
            setNombre(selected.nombre);
            setValor(selected.valor);
        } else {
            setNombre('');
            setValor('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nombre, valor };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setNombre('');
        setValor('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre del criterio"
            />
            <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Valor del criterio"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    );
};

RubricaCriterioForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
};

export default RubricaCriterioForm;