import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TipoEvaluacionJerarquiaForm = ({ onCreate, onUpdate, selected, setSelected, tiposEvaluacion, modalidades }) => {
    const [comp_id, setCompId] = useState('');
    const [comp_parent_id, setCompParentId] = useState(null);
    const [trabajo_modalidad_id, setTrabajoModalidadId] = useState('');

    useEffect(() => {
        if (selected) {
            setCompId(selected.comp_id);
            setCompParentId(selected.comp_parent_id || null);
            setTrabajoModalidadId(selected.trabajo_modalidad_id);
        } else {
            setCompId('');
            setCompParentId(null);
            setTrabajoModalidadId('');
        }
    }, [selected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { comp_id, comp_parent_id, trabajo_modalidad_id };
        if (selected) {
            onUpdate(selected.id, data);
        } else {
            onCreate(data);
        }
        setCompId('');
        setCompParentId(null);
        setTrabajoModalidadId('');
        setSelected(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label className="block mb-2">
                Tipo de Evaluación Hijo:
                <select
                    value={comp_id}
                    onChange={(e) => setCompId(e.target.value)}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Selecciona un tipo de evaluación</option>
                    {tiposEvaluacion.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block mb-2">
                Tipo de Evaluación Padre (opcional):
                <select
                    value={comp_parent_id || ''}
                    onChange={(e) => setCompParentId(e.target.value || null)}
                    className="border p-2 w-full"
                >
                    <option value="">Sin padre</option>
                    {tiposEvaluacion.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block mb-2">
                Modalidad de Titulación:
                <select
                    value={trabajo_modalidad_id}
                    onChange={(e) => setTrabajoModalidadId(e.target.value)}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Selecciona una modalidad</option>
                    {modalidades.map((modalidad) => (
                        <option key={modalidad.id} value={modalidad.id}>
                            {modalidad.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit" className="bg-green-500 text-white px-4 py-2">
                {selected ? 'Actualizar' : 'Crear'}
            </button>
            {selected && (
                <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="bg-red-500 text-white px-4 py-2 ml-2"
                >
                    Cancelar
                </button>
            )}
        </form>
    );
};

TipoEvaluacionJerarquiaForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selected: PropTypes.object,
    setSelected: PropTypes.func.isRequired,
    tiposEvaluacion: PropTypes.array.isRequired,
    modalidades: PropTypes.array.isRequired,
};

export default TipoEvaluacionJerarquiaForm;