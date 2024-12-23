import { useEffect, useState } from "react";

const UserProfile = () => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const info = JSON.parse(userInfo);
            setInfo(info);
            setUserPhoto(`data:image/jpeg;base64,${info.fotoBase64}`);
        }
    }, []);

    return (
        <div className="min-h-full bg-gray-100 flex items-start justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full mt-10">
                {/* Header */}
                <div className="bg-green-600 text-white rounded-t-lg p-6">
                    <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
                    <p className="text-sm">Sistema de Validación - Universidad</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Foto de perfil y detalles básicos */}
                    <div className="flex items-center space-x-6">
                        <img
                            src={userPhoto}
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{info.nombre}</h2>
                            <p className="text-gray-600">Estudiante</p>
                            <p className="text-gray-600">ID: {info.id_personal}</p>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-green-600 font-bold">Información de Contacto</h3>
                            <p className="text-gray-700 mt-2">Correo: {info.usuario}@utm.edu.ec</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-green-600 font-bold">Información Académica</h3>
                            <p className="text-gray-700 mt-2">Carrera: Ingeniería en Sistemas</p>
                            <p className="text-gray-700 mt-1">Semestre: 6°</p>
                            <p className="text-gray-700 mt-1">Promedio: 8.7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
