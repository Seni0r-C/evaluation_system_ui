import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const TrabajosTitulacion = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [formData, setFormData] = useState({
        carrera_id: "",
        modalidad_id: "",
        tutor_id: "",
        cotutor_id: "",
        titulo: "",
        link_archivo: "",
    });

    const [editId, setEditId] = useState(null);

    // Fetch trabajos de titulación
    const fetchTrabajos = async () => {
        try {
            const response = await axios.get(API_URL + "/trabajo-titulacion/listar");
            setTrabajos(response.data);
        } catch (error) {
            console.error("Error fetching trabajos:", error);
        }
    };

    useEffect(() => {
        fetchTrabajos();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for create or update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update trabajo
                await axios.put(`${API_URL}/trabajo-titulacion/actualizar/${editId}`, formData);
            } else {
                // Create trabajo
                await axios.post(API_URL + "/trabajo-titulacion/crear", formData);
            }
            setFormData({
                carrera_id: "",
                modalidad_id: "",
                tutor_id: "",
                cotutor_id: "",
                titulo: "",
                link_archivo: "",
            });
            setEditId(null);
            fetchTrabajos();
        } catch (error) {
            console.error("Error saving trabajo:", error);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/trabajo-titulacion/eliminar/${id}`);
            fetchTrabajos();
        } catch (error) {
            console.error("Error deleting trabajo:", error);
        }
    };

    // Handle edit
    const handleEdit = (trabajo) => {
        setFormData(trabajo);
        setEditId(trabajo.id);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Gestión de Trabajos de Titulación</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título del Trabajo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="carrera_id"
                        placeholder="ID de Carrera"
                        value={formData.carrera_id}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="modalidad_id"
                        placeholder="ID de Modalidad"
                        value={formData.modalidad_id}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="tutor_id"
                        placeholder="ID del Tutor"
                        value={formData.tutor_id}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="cotutor_id"
                        placeholder="ID del Cotutor (Opcional)"
                        value={formData.cotutor_id}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="link_archivo"
                        placeholder="Link al Archivo"
                        value={formData.link_archivo}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                >
                    {editId ? "Actualizar" : "Crear"} Trabajo
                </button>
            </form>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Lista de Trabajos</h2>
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Título</th>
                            <th className="border px-4 py-2">Carrera</th>
                            <th className="border px-4 py-2">Modalidad</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trabajos.map((trabajo) => (
                            <tr key={trabajo.id}>
                                <td className="border px-4 py-2">{trabajo.id}</td>
                                <td className="border px-4 py-2">{trabajo.titulo}</td>
                                <td className="border px-4 py-2">{trabajo.carrera}</td>
                                <td className="border px-4 py-2">{trabajo.modalidad}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(trabajo)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(trabajo.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrabajosTitulacion;
