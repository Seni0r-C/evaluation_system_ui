/* eslint-disable react/prop-types */
import { useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { useMessage } from '../../hooks/useMessage';

const ReportCard = ({ title, description, filters, onGenerate }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">{filters}</div>
        <button onClick={onGenerate} className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Generar Excel</button>
    </div>
);

const ReportsPage = () => {
    const { showMsg } = useMessage();
    const [fechasGraduados, setFechasGraduados] = useState({ fechaInicio: '', fechaFin: '' });

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Página de Reportes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ReportCard
                    title="Reporte de Graduados"
                    description="Genera un reporte de los estudiantes graduados en un rango de fechas."
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
            </div>
        </div>
    );
};

export default ReportsPage;
