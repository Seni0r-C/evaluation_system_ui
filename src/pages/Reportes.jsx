/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';

// Componente genérico para renderizar datos en forma de tabla
const DataTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No hay datos para mostrar.</div>;
    }
    const columns = Object.keys(data[0]);
    return (
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col} className="py-2 px-4 border-b">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col} className="py-2 px-4 border-b">{row[col]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Componente de paginación simple
const Pagination = ({ page, onPageChange, hasMore }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={page === 1}
            >
                Anterior
            </button>
            <span>Página {page}</span>
            <button
                onClick={() => onPageChange(page + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!hasMore}
            >
                Siguiente
            </button>
        </div>
    );
};

// 1. Reporte de Graduación en Rango de Fechas
const GraduationRangeReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        if (!startDate || !endDate) return;
        try {
            const response = await axiosInstance.get('/reportes/graduados', {
                params: { fechaInicio: startDate, fechaFin: endDate, page, limit },
            });
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Graduación en Rango de Fechas</h2>
            <div className="flex space-x-4 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Fecha Inicio"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Fecha Fin"
                />
                <button
                    onClick={() => {
                        setPage(1);
                        fetchData();
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// 2. Reporte de Trabajos Pendientes por Estado
const PendingWorksReport = () => {
    const [estadoId, setEstadoId] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        if (!estadoId) return;
        try {
            const response = await axiosInstance.get('/reportes/trabajos-pendientes', {
                params: { estadoId, page, limit },
            });
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Trabajos Pendientes por Estado</h2>
            <div className="flex space-x-4 mb-4">
                <select
                    value={estadoId}
                    onChange={(e) => setEstadoId(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Selecciona un estado</option>
                    <option value="1">ANTEPROYECTO</option>
                    <option value="2">SIN TRIBUNAL</option>
                    <option value="3">CON TRIBUNAL</option>
                    <option value="4">DEFENDIDO</option>
                </select>
                <button
                    onClick={() => {
                        setPage(1);
                        fetchData();
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// 3. Reporte de Calificaciones Promedio por Modalidad
const AverageGradesReport = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/reportes/calificaciones-promedio', {
                params: { page, limit },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Calificaciones Promedio por Modalidad</h2>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// 4. Reporte de Carga de Trabajo de Docentes como Tutores
const TutorWorkloadReport = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/reportes/carga-tutores', {
                params: { page, limit },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Carga de Trabajo de Docentes como Tutores</h2>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// 5. Reporte de Solicitudes de Excepción
const ExceptionRequestsReport = () => {
    const [estado, setEstado] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        if (!estado) return;
        try {
            const response = await axiosInstance.get('/reportes/solicitudes-excepcion', {
                params: { estado, page, limit },
            });
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Solicitudes de Excepción</h2>
            <div className="flex space-x-4 mb-4">
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Selecciona un estado</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Rechazada">Rechazada</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
                <button
                    onClick={() => {
                        setPage(1);
                        fetchData();
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// 6. Reporte de Tendencias de Rendimiento Académico
const AcademicPerformanceTrendsReport = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/reportes/tendencias-rendimiento', {
                params: { page, limit },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tendencias de Rendimiento Académico</h2>
            {data && data.length > 0 && <DataTable data={data} />}
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

// Panel principal de reportes
const ReportsPage = () => {
    const reportTypes = [
        { key: 'graduationRange', label: 'Graduación por Rango de Fechas' },
        { key: 'pendingWorks', label: 'Trabajos Pendientes por Estado' },
        { key: 'averageGrades', label: 'Calificaciones Promedio por Modalidad' },
        { key: 'tutorWorkload', label: 'Carga de Trabajo de Docentes como Tutores' },
        { key: 'exceptionRequests', label: 'Solicitudes de Excepción' },
        { key: 'academicPerformanceTrends', label: 'Tendencias de Rendimiento Académico' },
    ];
    const [selectedReport, setSelectedReport] = useState(reportTypes[0].key);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Panel de Reportes para Vicedecanos</h1>
            <div className="flex space-x-4 mb-6">
                {reportTypes.map((rt) => (
                    <button
                        key={rt.key}
                        onClick={() => setSelectedReport(rt.key)}
                        className={`w-full text-left py-2 px-4 rounded ${selectedReport === rt.key
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                            }`}
                    >
                        {rt.label}
                    </button>
                ))}
            </div>
            {selectedReport === 'graduationRange' && <GraduationRangeReport />}
            {selectedReport === 'pendingWorks' && <PendingWorksReport />}
            {selectedReport === 'averageGrades' && <AverageGradesReport />}
            {selectedReport === 'tutorWorkload' && <TutorWorkloadReport />}
            {selectedReport === 'exceptionRequests' && <ExceptionRequestsReport />}
            {selectedReport === 'academicPerformanceTrends' && <AcademicPerformanceTrendsReport />}
        </div>
    );
};

export default ReportsPage;