import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarioEventos = () => {
    const [date, setDate] = useState(new Date()); // Fecha seleccionada para el calendario

    // Función para manejar el cambio de fecha desde el input tipo "month"
    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        const [year, month] = selectedMonth.split('-'); // Extraer el año y mes
        const newDate = new Date(year, month - 1, 1); // Establecer la fecha al primer día del mes seleccionado
        setDate(newDate); // Establece la nueva fecha seleccionada
    };

    // Datos de ejemplo
    const eventos = [
        { start: new Date(2024, 11, 10, 10, 0), end: new Date(2024, 11, 10, 11, 0), title: 'Defensa de Tesis - Juan Pérez' },
        { start: new Date(2024, 11, 12, 14, 0), end: new Date(2024, 11, 12, 15, 0), title: 'Defensa de Tesis - María López' },
        { start: new Date(2024, 11, 15, 11, 0), end: new Date(2024, 11, 15, 12, 0), title: 'Defensa de Tesis - Carlos González' },
    ];

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            {/* Título de la página */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-indigo-600">Calendario de Eventos</h1>
                <p className="text-gray-700 mt-2 text-lg">Consulta las fechas importantes para las defensas de tesis.</p>
            </div>

            {/* Input tipo "month" para seleccionar mes y año */}
            <div className="flex justify-center items-center mt-4 space-x-4">
                <label htmlFor="monthSelector" className="text-lg text-gray-700">Selecciona un mes y año:</label>
                <input
                    id="monthSelector"
                    type="month"
                    value={moment(date).format('YYYY-MM')} // Formato adecuado para el input de tipo "month"
                    onChange={handleMonthChange}
                    className="p-2 border rounded-lg w-36 text-center"
                />
            </div>

            {/* Calendario */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6">
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    date={date} // Configura el calendario con la fecha seleccionada
                    onSelectEvent={(evento) => alert(`Evento: ${evento.title}`)}
                />
            </div>
        </div>
    );
};

export default CalendarioEventos;
