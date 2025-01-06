import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {hourAndDateFromDateTimeMySQL} from '../../utils/constants';

const SelectorFecha = ({ onDateChange, required = false, trabajoData}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState('');

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
                // type="text"
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

// SelectorFecha.propTypes = {
//     onDateChange: PropTypes.func.isRequired,
//     required: PropTypes.bool,
// };

export default SelectorFecha;
