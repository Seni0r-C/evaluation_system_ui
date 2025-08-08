import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RolFormulario = ({ onCreate, onUpdate, selected, setSelected }) => {
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
        setSelected(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="nombre-rol" className="sr-only">Nombre del rol</label>
            <input
                type="text"
                id="nombre-rol"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre del rol"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
            {selected && <button onClick={() => setSelected(null)} className="bg-red-500 text-white px-4 py-2 ml-2">Cancelar</button>}
        </form>
    );
};

RolFormulario.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
    setSelected: PropTypes.func
};

export default RolFormulario;
