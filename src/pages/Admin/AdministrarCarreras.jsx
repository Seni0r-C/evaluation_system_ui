import { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';


const AdministrarCarreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [nombreCarrera, setNombreCarrera] = useState('');
    const [editCarrera, setEditCarrera] = useState(null);
    const [loading, setLoading] = useState(false);

    // Obtener la lista de carreras
    const fetchCarreras = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/carrera/listar');
            setCarreras(response.data.datos);
        } catch (error) {
            console.error('Error al obtener las carreras:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarreras();
    }, []);

    // Crear nueva carrera
    const handleCreate = async () => {
        try {
            await axiosInstance.post('/carrera/crear', { nombre: nombreCarrera });
            setNombreCarrera('');
            fetchCarreras();
        } catch (error) {
            console.error('Error al crear la carrera:', error);
        }
    };

    // Actualizar carrera
    const handleUpdate = async () => {
        if (!editCarrera) return;
        try {
            await axiosInstance.put(`/carrera/actualizar/${editCarrera.id}`, { nombre: editCarrera.nombre });
            setEditCarrera(null);
            fetchCarreras();
        } catch (error) {
            console.error('Error al actualizar la carrera:', error);
        }
    };

    // Eliminar carrera
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/carrera/eliminar/${id}`);
            fetchCarreras();
        } catch (error) {
            console.error('Error al eliminar la carrera:', error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Gestión de Carreras</h1>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nombre de la carrera"
                        value={nombreCarrera}
                        onChange={(e) => setNombreCarrera(e.target.value)}
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={handleCreate}
                        disabled={!nombreCarrera.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Crear
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading && <p>Cargando...</p>}
                {carreras.map((carrera) => (
                    <div key={carrera.id} className="bg-white p-4 rounded-lg shadow space-y-2">
                        {editCarrera?.id === carrera.id ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={editCarrera.nombre}
                                    onChange={(e) =>
                                        setEditCarrera({ ...editCarrera, nombre: e.target.value })
                                    }
                                    className="flex-1 p-2 border rounded"
                                />
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setEditCarrera(null)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-lg font-semibold">{carrera.nombre}</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditCarrera(carrera)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(carrera.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdministrarCarreras;
