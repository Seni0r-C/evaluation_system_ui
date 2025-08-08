/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hourAndDateFromDateTimeMySQL } from '../../utils/constants';

/**
 * Componente SelectorFecha que permite seleccionar una fecha y hora.
 *
 * @param {function} onDateChange - Función que se llama cuando la fecha cambia.
 * @param {boolean} [required=false] - Indica si el campo de fecha es obligatorio.
 * @param {object} trabajoData - Datos del trabajo, que pueden incluir la fecha de defensa.
 *
 * @returns {ReactElement} Un campo de entrada para seleccionar fecha y hora,
 * con validación para evitar fechas anteriores a la actual.
 */

const SelectorFecha = ({ label, onDateChange, required = false, trabajoData }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [error, setError] = useState('');
    const inputId = `selector-fecha-${label ? label.toLowerCase().replace(/\s+/g, '-') : ''}`;
    const errorId = `${inputId}-error`;

    useEffect(() => {
        if (trabajoData?.fecha_defensa && !selectedDate) {
            try {
                const formattedDate = hourAndDateFromDateTimeMySQL(trabajoData.fecha_defensa);
                setSelectedDate(formattedDate);
            } catch (error) {
                console.error('Error al formatear la fecha:', error);
            }
        }
    }, [trabajoData?.fecha_defensa]);


    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        setError(''); // Limpiar error al cambiar la fecha

        // Validar si es futura (opcional)
        // const today = new Date().toISOString().split('T')[0];
        // if (newDate < today) {
        //     setError('La fecha no puede ser anterior a hoy.');
        // } else {
        //     onDateChange(newDate); // Enviar la fecha al componente padre
        // }
        onDateChange(newDate); // Enviar la fecha al componente padre
    };

    return (
        <div className="">
            {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            {/* Selector de Fecha */}
            <input
                id={inputId}
                type="datetime-local"
                value={selectedDate}
                onChange={handleDateChange}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                required={required}
                aria-describedby={error ? errorId : undefined}
            />

            {/* Mensaje de Error */}
            {error && <p id={errorId} className="text-red-500 text-sm mt-1" aria-live="assertive">{error}</p>}
        </div>
    );
};

SelectorFecha.propTypes = {
    label: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    trabajoData: PropTypes.object,
};

export default SelectorFecha;