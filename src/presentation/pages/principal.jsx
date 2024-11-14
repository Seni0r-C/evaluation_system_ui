import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Principal = () => {
    // Datos de ejemplo para las tesis
    const tesisData = [
        {
            id: 1,
            titulo: "Análisis de Algoritmos en la Ciencia de Datos",
            autor: "Juan Pérez",
            estado: "Pendiente",
            fechaEntrega: "2024-11-10",
        },
        {
            id: 2,
            titulo: "Estudio de Redes Neuronales para Predicción Financiera",
            autor: "Ana Gómez",
            estado: "En revisión",
            fechaEntrega: "2024-11-05",
        },
        {
            id: 3,
            titulo: "Desarrollo de un Sistema de Recomendación en E-commerce",
            autor: "Carlos Martínez",
            estado: "Pendiente",
            fechaEntrega: "2024-11-12",
        },
    ];

    // Estadísticas generales de tesis
    const [estadisticas] = useState({
        pendiente: tesisData.filter((tesis) => tesis.estado === "Pendiente").length,
        enRevision: tesisData.filter((tesis) => tesis.estado === "En revisión").length,
    });

    // Gráfico para la cantidad de tesis por estado
    const data = [
        { name: 'Pendientes', value: estadisticas.pendiente },
        { name: 'En Revisión', value: estadisticas.enRevision },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto p-6">
                <h2 className="text-xl font-semibold mb-6">Dashboard de Tesis</h2>

                {/* Resumen Estadístico */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-blue-700">Tesis Pendientes</h3>
                        <p className="text-4xl font-bold">{estadisticas.pendiente}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-yellow-600">Tesis en Revisión</h3>
                        <p className="text-4xl font-bold">{estadisticas.enRevision}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-green-600">Tesis Finalizadas</h3>
                        <p className="text-4xl font-bold">{tesisData.length - estadisticas.pendiente - estadisticas.enRevision}</p>
                    </div>
                </div>

                {/* Gráfico de Tesis por Estado */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Tesis por Estado</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                <Cell fill="#ff7300" />
                                <Cell fill="#387908" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Tesis List */}
                <h3 className="text-xl font-semibold mb-6">Tesis Pendientes de Calificación</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tesisData.map((tesis) => (
                        <div key={tesis.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
                            <h3 className="text-lg font-semibold text-blue-700">{tesis.titulo}</h3>
                            <p className="text-gray-600 mt-2">Autor: {tesis.autor}</p>
                            <p className="text-gray-500 mt-2">Fecha de entrega: {tesis.fechaEntrega}</p>
                            <p
                                className={`mt-4 p-2 text-center rounded-lg ${tesis.estado === "Pendiente" ? "bg-yellow-200" : "bg-blue-200"
                                    }`}
                            >
                                Estado: {tesis.estado}
                            </p>

                            <div className="mt-4 flex justify-between items-center">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Ver Detalles
                                </button>
                                {tesis.estado === "Pendiente" && (
                                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        Calificar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Principal;
