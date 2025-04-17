import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PermisoFormulario = ({ onCreate, onUpdate, selected, setSelected }) => {
    const [nombre, setNombre] = useState('');
    const [permiso, setPermiso] = useState('');

    useEffect(() => {
        if (selected) {
            setNombre(selected.nombre);
            setPermiso(selected.permiso);
        } else {
            setNombre('');
            setPermiso('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nombre, permiso };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setNombre('');
        setPermiso('');
        setSelected(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Nombre del permiso"
            />
            <input
                type="text"
                value={permiso}
                onChange={(e) => setPermiso(e.target.value)}
                className="border p-2 mr-2"
                placeholder="Permiso (ej: usuarios.crear)"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
            {selected && <button onClick={() => setSelected(null)} className="bg-red-500 text-white px-4 py-2 ml-2">Cancelar</button>}
        </form>
    );
};

PermisoFormulario.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
    setSelected: PropTypes.func
};

export default PermisoFormulario;
