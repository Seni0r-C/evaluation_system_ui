import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarioEventos = () => {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        const [year, month] = selectedMonth.split('-');
        const newDate = new Date(year, month - 1, 1);
        setDate(newDate);
    };

    // Datos de ejemplo
    const eventos = [
        {
            start: new Date(2024, 11, 10, 10, 0),
            end: new Date(2024, 11, 10, 11, 0),
            title: 'Defensa de Tesis - Juan Pérez',
            descripcion: 'Juan Pérez presentará su tesis sobre inteligencia artificial.',
            lugar: 'Auditorio A, Facultad de Ingeniería',
            fecha: '10 de diciembre de 2024',
            hora: '10:00 AM',
        },
        {
            start: new Date(2024, 11, 12, 14, 0),
            end: new Date(2024, 11, 12, 15, 0),
            title: 'Defensa de Tesis - María López',
            descripcion: 'María López discutirá su investigación sobre biotecnología.',
            lugar: 'Auditorio B, Facultad de Ciencias',
            fecha: '12 de diciembre de 2024',
            hora: '2:00 PM',
        },
        {
            start: new Date(2024, 11, 15, 11, 0),
            end: new Date(2024, 11, 15, 12, 0),
            title: 'Defensa de Tesis - Carlos González',
            descripcion: 'Carlos González presentará su trabajo sobre robótica.',
            lugar: 'Auditorio C, Facultad de Robótica',
            fecha: '15 de diciembre de 2024',
            hora: '11:00 AM',
        },
    ];

    const handleEventClick = (evento) => {
        setSelectedEvent(evento); // Establecer el evento seleccionado
        setShowModal(true); // Mostrar el modal
    };

    const closeModal = () => {
        setShowModal(false); // Cerrar el modal
    };

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
                    value={moment(date).format('YYYY-MM')}
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
                    date={date}
                    onSelectEvent={handleEventClick} // Al hacer clic en un evento
                />
            </div>

            {/* Modal de información del evento */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold text-indigo-600">{selectedEvent.title}</h2>
                        <p className="mt-2 text-gray-700"><strong>Descripción:</strong> {selectedEvent.descripcion}</p>
                        <p className="mt-2 text-gray-700"><strong>Lugar:</strong> {selectedEvent.lugar}</p>
                        <p className="mt-2 text-gray-700"><strong>Fecha:</strong> {selectedEvent.fecha}</p>
                        <p className="mt-2 text-gray-700"><strong>Hora:</strong> {selectedEvent.hora}</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarioEventos;
