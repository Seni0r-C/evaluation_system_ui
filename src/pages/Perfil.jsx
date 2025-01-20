import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";

const UserProfile = () => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [info, setInfo] = useState({});
    const [thesisList, setThesisList] = useState([]);

    useEffect(() => {
        // Cargar información del usuario
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsedInfo = JSON.parse(userInfo);
            setInfo(parsedInfo);
            setUserPhoto(`data:image/jpeg;base64,${parsedInfo.fotoBase64}`);
        }

        // Simulación de la lista de trabajos de titulación
        const fetchedThesisList = [
            {
                title: "Sistema de Gestión Académica",
                year: 2023,
                advisor: "Dr. Carlos Pérez",
                progress: ["Revisión", "Asignación de Fecha", "Defensa"]
            },
            {
                title: "Plataforma de Comercio Electrónico",
                year: 2022,
                advisor: "Ing. María Torres",
                progress: ["Revisión", "Asignación de Fecha"]
            },
            {
                title: "Aplicación Móvil para Educación",
                year: 2021,
                advisor: "MSc. Juan López",
                progress: ["Revisión"]
            },
        ];
        setThesisList(fetchedThesisList);
    }, []);

    const renderProgress = (steps) => {
        const allSteps = ["Revisión", "Asignación de Fecha", "Defensa"];
        const icons = [
            <HiMiniDocumentMagnifyingGlass className="text-gray-50" size={20} key={0} />,
            <FaCircle className="text-gray-50" size={20} key={1} />,
            <FaCircle className="text-gray-50" size={20} key={2} />,
        ]
        return (
            <div className="flex items-center space-x-1 whitespace-nowrap">
                {allSteps.map((step, index) => {
                    const isCompleted = steps.includes(step);
                    return (
                        <div key={index} className="flex-col">
                            <div key={index} className="flex items-center">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 p-1 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-300 border-gray-300 text-gray-500'}`}
                                >
                                    {icons[index]}
                                </div>
                                {index < allSteps.length - 1 && (
                                    <div className={`h-1 w-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                )}
                            </div>
                            <p className="text-gray-500 mx-10 text-xs"
                            >{step}</p>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-full">
            <div className="max-w-fit md:max-w-7xl mx-auto py-8 px-2">
                {/* Header */}
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Perfil de Usuario</h1>
                    <p className="text-sm text-gray-500">Sistema de calificación de trabajos de titulación - FCI</p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Foto de perfil y detalles básicos */}
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={userPhoto}
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-lg border border-gray-300 object-cover mb-4"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{info.nombre}</h2>
                            <p className="text-sm text-gray-500">Estudiante</p>
                            <p className="text-sm text-gray-500">ID: {info.id_personal}</p>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h3 className="text-base font-medium text-gray-700">Información de Contacto</h3>
                            <p className="text-sm text-gray-600 mt-2">Correo: {info.usuario}@utm.edu.ec</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="text-base font-medium text-gray-700">Información Académica</h3>
                            <p className="text-sm text-gray-600 mt-2">Carrera: Ingeniería en Sistemas</p>
                            <p className="text-sm text-gray-600">Semestre: 6°</p>
                            <p className="text-sm text-gray-600">Promedio: 8.7</p>
                        </div>
                    </div>
                </div>

                {/* Lista de trabajos de titulación */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Trabajos de Titulación</h3>
                    <ul className="space-y-6">
                        {thesisList.map((thesis, index) => (
                            <li
                                key={index}
                                className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h4 className="text-lg font-medium text-gray-700">{thesis.title}</h4>
                                <p className="text-sm text-gray-600">Año: {thesis.year}</p>
                                <p className="text-sm text-gray-600">Asesor: {thesis.advisor}</p>
                                <div className="mt-4 max-w-xs md:max-w-4xl overflow-x-auto">{renderProgress(thesis.progress)}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
