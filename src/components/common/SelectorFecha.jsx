import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {hourAndDateFromDateTimeMySQL} from '../../utils/constants';

const SelectorFecha = ({ onDateChange, required = false, initialDate = '' }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const formattedDate = hourAndDateFromDateTimeMySQL(initialDate);
        alert("SelectorFecha----------"+JSON.stringify(formattedDate, null, 2));
        if (initialDate && !selectedDate) {
            try {
                // const formattedDate = initialDate;
                setSelectedDate(formattedDate);
            } catch (error) {
                console.error('Error al formatear la fecha:', error);
            }
        }
    }, [initialDate]);
    
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        // alert("handleDateChange: "+JSON.stringify(newDate, null, 2));
        setSelectedDate(newDate);
        setError(''); // Limpiar error al cambiar la fecha

        // Validar si es futura (opcional)
        const today = new Date().toISOString().split('T')[0];
        if (newDate < today) {
            setError('La fecha no puede ser anterior a hoy.');
        } else {
            onDateChange(newDate); // Enviar la fecha al componente padre
        }
    };

    return (
        <div className="">
            
            {/* Selector de Fecha */}
            <input
                type="datetime-local"
                value={selectedDate}
                onChange={handleDateChange}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                required={required}
            />

            {/* Mensaje de Error */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

SelectorFecha.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    initialDate: PropTypes.string
};

export default SelectorFecha;
