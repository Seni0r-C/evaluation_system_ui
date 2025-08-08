import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RubricaCriterioForm = ({ onCreate, onUpdate, selected, setSelected }) => {
    const [nombre, setNombre] = useState('');
    const [puntajeMaximo, setPuntajeMaximo] = useState('');

    useEffect(() => {
        if (selected) {
            setNombre(selected.nombre);
            setPuntajeMaximo(selected.puntaje_maximo);
        } else {
            setNombre('');
            setPuntajeMaximo('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nombre, valor: puntajeMaximo };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setNombre('');
        setPuntajeMaximo('');
        setSelected(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="nombre-criterio" className="sr-only">Nombre del criterio</label>
            <input
                type="text"
                id="nombre-criterio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre del criterio"
            />
            <label htmlFor="puntaje-maximo" className="sr-only">Puntaje máximo</label>
            <input
                type="text"
                id="puntaje-maximo"
                value={puntajeMaximo}
                onChange={(e) => setPuntajeMaximo(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Puntaje maximo"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
            {selected && <button onClick={() => setSelected(null)} className="bg-red-500 text-white px-4 py-2 ml-2">Cancelar</button>}
        </form>
    );
};

RubricaCriterioForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
    setSelected: PropTypes.func
};

export default RubricaCriterioForm;