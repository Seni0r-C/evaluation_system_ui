
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sistema de Calificación de Tesis</h1>
                    <div className="flex items-center space-x-4">
                        <span>Bienvenido, Juan Pérez</span>
                        <button className="bg-blue-800 px-4 py-2 rounded">Cerrar sesión</button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-6">
                <h2 className="text-xl font-semibold mb-6">Tesis Pendientes de Calificación</h2>

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
