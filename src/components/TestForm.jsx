import React, { useState } from 'react';
import BuscadorGenerico from './BuscadorGenerico';  // Asegúrate de ajustar la ruta al componente
// import { buscarUsuariosConRol } from '../services/usuarioService'; // Puedes omitir esta parte si no tienes un servicio real
const estudiantesData = [
    { id: 1, nombre: 'Juan Pérez', carrera: 'Ingeniería', cedula: '1351337603' },
    { id: 2, nombre: 'Ana García', carrera: 'Arquitectura', cedula: '1234567890' },
    { id: 3, nombre: 'Luis Rodríguez', carrera: 'Medicina', cedula: '1234567891'},
    { id: 4, nombre: 'Marta Fernández', carrera: 'Derecho', cedula: '1234567892' },
    { id: 5, nombre: 'Carlos Gómez', carrera: 'Biología', cedula: '1234567893' },
    { id: 6, nombre: 'Laura Martínez', carrera: 'Psicología', cedula: '1234567894' },
    { id: 7, nombre: 'David Sánchez', carrera: 'Matemáticas', cedula: '1234567895' },
    { id: 8, nombre: 'Elena López', carrera: 'Historia', cedula: '2234567890' },
    { id: 9, nombre: 'Pedro Díaz', carrera: 'Física', cedula: '3234567890' },
    { id: 10, nombre: 'Lucía Torres', carrera: 'Química', cedula: '4234567890' },
];

const TestForm = () => {
    // Estado para la búsqueda y resultados
    const [estudianteSearch, setEstudianteSearch] = useState('');
    const [estudiantes, setEstudiantes] = useState(estudiantesData);
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);

    // Función para simular la búsqueda de estudiantes
    const handleBuscarNombre = (query, setResults, setShowSpinner) => {
        setShowSpinner(true);  // Mostrar el spinner
        setTimeout(() => {
            const results = estudiantesData.filter(est =>
                est.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setResults(results);
            setShowSpinner(false);  // Ocultar el spinner cuando se obtienen los resultados
        }, 500);  // Simulamos un retraso en la búsqueda
    };

    const handleBuscarNombre2 = (query, setResults, setShowSpinner) => {
        setShowSpinner(true);  // Mostrar el spinner
        setTimeout(() => {
            const results = estudiantesData.filter(est =>
                est.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setResults(results);
            setShowSpinner(false);  // Ocultar el spinner cuando se obtienen los resultados
        }, 500);  // Simulamos un retraso en la búsqueda
    };

    const handleBuscarCarrera = (query, setResults, setShowSpinner) => {
        setShowSpinner(true);  // Mostrar el spinner
        setTimeout(() => {
            const results = estudiantesData.filter(est =>
                est.carrera.toLowerCase().includes(query.toLowerCase())
            );
            setResults(results);
            setShowSpinner(false);  // Ocultar el spinner cuando se obtienen los resultados
        }, 500);  // Simulamos un retraso en la búsqueda
    };

    const handleBuscarCedula = (query, setResults, setShowSpinner) => {
        setShowSpinner(true);  // Mostrar el spinner
        setTimeout(() => {
            const results = estudiantesData.filter(est =>
                est.cedula.toLowerCase().includes(query.toLowerCase())
            );
            setResults(results);
            setShowSpinner(false);  // Ocultar el spinner cuando se obtienen los resultados
        }, 500);  // Simulamos un retraso en la búsqueda
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Formulario de Prueba: Seleccionar Estudiantes</h1>

            {/* Buscador de Estudiantes */}
            <BuscadorGenerico
                key="estudiante1"
                label="Buscar Estudiante"
                placeholder="Ingrese el nombre del estudiante"
                handlerBuscar={handleBuscarNombre2}
                onSelectionChange={(items) => setSelectedEstudiantes(items)}
                allowDuplicates={false}  // No permitir duplicados
                maxSelections={-1}       // Selección múltiple ilimitada
                required={true}
            />
          


            {/* Mostrar estudiantes seleccionados */}
            <div className="mt-4">
                <h2 className="font-semibold">Estudiantes Seleccionados:</h2>
                {selectedEstudiantes.length === 0 ? (
                    <p>No hay estudiantes seleccionados.</p>
                ) : (
                    <ul>
                        {selectedEstudiantes.map((estudiante) => (
                            <li key={estudiante.id} className="py-1">
                                {estudiante.nombre} - {estudiante.carrera}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TestForm;
