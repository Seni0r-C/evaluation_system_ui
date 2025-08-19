/* eslint-disable react/prop-types */
import { useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { useMessage } from '../../hooks/useMessage';
import BuscadorYSelectorDeUsuarios from '../../components/utmcomps/BuscadorYSelectorDeUsuarios';
import { buscarUsuarios } from '../../services/usuarioService';

const ReportCard = ({ title, description, filters, onGenerate }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 h-24">{description}</p>
        <div className="mt-4">{filters}</div>
        <button onClick={onGenerate} className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Generar Excel</button>
    </div>
);

const ReportsPage = () => {
    const { showMsg } = useMessage();
    const [fechasGraduados, setFechasGraduados] = useState({ fechaInicio: '', fechaFin: '' });
    const [estadoId, setEstadoId] = useState('');
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [estudianteSearch, setEstudianteSearch] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [highlightedIndexEstudiante, setHighlightedIndexEstudiante] = useState(-1);

    const handleGenerateReport = async (url, params, fileName) => {
        showMsg({ typeMsg: 'wait', message: 'Generando reporte...' });
        try {
            const response = await axiosInstance.get(url, { params, responseType: 'blob' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            showMsg({ typeMsg: 'success', message: 'Reporte generado exitosamente' });
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            showMsg({ typeMsg: 'error', message: 'Error al generar el reporte' });
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 pb-2">Página de Reportes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ReportCard
                    title="Reporte de Defensas"
                    description="Genera un reporte de los estudiantes que han defendido su trabajo de titulación en un rango de fechas."
                    filters={
                        <div className="flex gap-4">
                            <input type="date" value={fechasGraduados.fechaInicio} onChange={(e) => setFechasGraduados({ ...fechasGraduados, fechaInicio: e.target.value })} className="w-full p-2 border rounded" />
                            <input type="date" value={fechasGraduados.fechaFin} onChange={(e) => setFechasGraduados({ ...fechasGraduados, fechaFin: e.target.value })} className="w-full p-2 border rounded" />
                        </div>
                    }
                    onGenerate={() => handleGenerateReport('/reportes/graduados/excel', fechasGraduados, 'reporte_graduados.xlsx')}
                />
                <ReportCard
                    title="Reporte de Carga de Tutores"
                    description="Genera un reporte con la cantidad de trabajos de titulación asignados a cada tutor."
                    onGenerate={() => handleGenerateReport('/reportes/carga-tutores/excel', {}, 'reporte_carga_tutores.xlsx')}
                />
                <ReportCard
                    title="Reporte de Trabajos Pendientes"
                    description="Genera un reporte de los trabajos de titulación pendientes por estado."
                    filters={
                        <select value={estadoId} onChange={(e) => setEstadoId(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Seleccione un estado</option>
                            <option value="1">Anteproyecto</option>
                            <option value="2">Sin Tribunal</option>
                            <option value="3">Con Tribunal</option>
                        </select>
                    }
                    onGenerate={() => handleGenerateReport('/reportes/trabajos-pendientes/excel', { estadoId }, 'reporte_trabajos_pendientes.xlsx')}
                />
                <ReportCard
                    title="Reporte de Calificaciones Promedio por Modalidad"
                    description="Genera un reporte con el promedio de calificaciones por modalidad."
                    onGenerate={() => handleGenerateReport('/reportes/calificaciones-promedio/excel', {}, 'reporte_calificaciones_promedio.xlsx')}
                />
                <ReportCard
                    title="Reporte de Tendencias de Rendimiento Académico"
                    description="Genera un reporte con las tendencias de rendimiento académico a lo largo del tiempo."
                    onGenerate={() => handleGenerateReport('/reportes/tendencias-rendimiento/excel', {}, 'reporte_tendencias_rendimiento_academico.xlsx')}
                />
                <ReportCard
                    title="Reporte por Estudiante"
                    description="Genera un reporte detallado de un estudiante específico."
                    filters={
                        <BuscadorYSelectorDeUsuarios
                            label="Buscar Estudiante"
                            placeholder="Ingrese la cédula o nombre del estudiante"
                            searchValue={estudianteSearch}
                            setSearchValue={setEstudianteSearch}
                            searchResults={estudiantes}
                            setSearchResults={setEstudiantes}
                            selectedUser={selectedEstudiante}
                            setSelectedUser={setSelectedEstudiante}
                            handleKeyDown={() => {}}
                            handleChipRemove={() => setSelectedEstudiante(null)}
                            type="estudiante"
                            setHighlightedIndex={setHighlightedIndexEstudiante}
                            highlightedIndex={highlightedIndexEstudiante}
                            handleBuscar={(query, setResults) => buscarUsuarios(query, setResults, 4)} // Rol para estudiantes
                        />
                    }
                    onGenerate={() => {
                        if (selectedEstudiante) {
                            handleGenerateReport(`/reportes/estudiante/${selectedEstudiante.id}/excel`, {}, `reporte_${selectedEstudiante.nombre}.xlsx`);
                        } else {
                            showMsg({ typeMsg: 'warning', message: 'Por favor, seleccione un estudiante.' });
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ReportsPage;
