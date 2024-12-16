import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const ModalidadesTitulacion = () => {
    const [modalidades, setModalidades] = useState([]);
    const [formData, setFormData] = useState({ nombre: "", max_participantes: "" });
    const [selectedId, setSelectedId] = useState(null);
    const [carreras, setCarreras] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState("");
    const [asociaciones, setAsociaciones] = useState([]);

    // Fetch modalidades
    const fetchModalidades = async () => {
        try {
            const res = await axios.get(API_URL + "/modalidad-titulacion/listar");
            setModalidades(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch carreras
    const fetchCarreras = async () => {
        try {
            const res = await axios.get(API_URL + "/carrera/listar");
            setCarreras(res.data.datos);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch asociaciones por carrera
    const fetchAsociaciones = async (idCarrera) => {
        try {
            const res = await axios.get(`${API_URL}/modalidad-titulacion/listarPorCarrera/${idCarrera}`);
            setAsociaciones(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchModalidades();
        fetchCarreras();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create or update modalidad
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedId) {
                await axios.put(`${API_URL}/modalidad-titulacion/actualizar/${selectedId}`, formData);
            } else {
                await axios.post(API_URL + "/modalidad-titulacion/crear", formData);
            }
            setFormData({ nombre: "", max_participantes: "" });
            setSelectedId(null);
            fetchModalidades();
        } catch (err) {
            console.error(err);
        }
    };

    // Edit modalidad
    const handleEdit = (modalidad) => {
        setFormData({ nombre: modalidad.nombre, max_participantes: modalidad.max_participantes });
        setSelectedId(modalidad.id);
    };

    // Delete modalidad
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/modalidad-titulacion/eliminar/${id}`);
            fetchModalidades();
        } catch (err) {
            console.error(err);
        }
    };

    // Associate modalidad with carrera
    const handleAsociar = async (idModalidad) => {
        try {
            await axios.post(API_URL + "/modalidad-titulacion/asociar", { id_carrera: selectedCarrera, id_modalidad_titulacion: idModalidad });
            fetchAsociaciones(selectedCarrera);
        } catch (err) {
            console.error(err);
        }
    };

    // Disassociate modalidad from carrera
    const handleDesasociar = async (idModalidad) => {
        try {
            await axios.delete(API_URL + "/modalidad-titulacion/desasociar", { data: { id_carrera: selectedCarrera, id_modalidad_titulacion: idModalidad } });
            fetchAsociaciones(selectedCarrera);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestión de Modalidades de Titulación</h1>

            {/* Formulario de Modalidades */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Máximo de Participantes:</label>
                    <input
                        type="number"
                        name="max_participantes"
                        value={formData.max_participantes}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    {selectedId ? "Actualizar" : "Crear"}
                </button>
            </form>

            {/* Lista de Modalidades */}
            <div>
                <h2 className="text-xl font-bold">Modalidades Existentes</h2>
                <ul className="space-y-2">
                    {modalidades.map((modalidad) => (
                        <li key={modalidad.id} className="p-2 border rounded flex justify-between items-center">
                            <span>{modalidad.nombre} (Máx: {modalidad.max_participantes})</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(modalidad)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(modalidad.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Gestión de Asociaciones */}
            <div>
                <h2 className="text-xl font-bold">Asociar Modalidades a Carreras</h2>
                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Seleccionar Carrera:</label>
                        <select
                            onChange={(e) => {
                                setSelectedCarrera(e.target.value);
                                fetchAsociaciones(e.target.value);
                            }}
                            value={selectedCarrera}
                            className="p-2 border rounded"
                        >
                            <option value="">Seleccione una carrera</option>
                            {carreras.map((carrera) => (
                                <option key={carrera.id} value={carrera.id}>
                                    {carrera.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h3 className="font-semibold">Modalidades Asociadas</h3>
                    <ul className="space-y-2">
                        {asociaciones.map((asociacion) => (
                            <li key={asociacion.id} className="p-2 border rounded flex justify-between items-center">
                                <span>{asociacion.nombre}</span>
                                <button
                                    onClick={() => handleDesasociar(asociacion.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Desasociar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h3 className="font-semibold">Modalidades Disponibles</h3>
                    <ul className="space-y-2">
                        {modalidades.map((modalidad) => (
                            <li key={modalidad.id} className="p-2 border rounded flex justify-between items-center">
                                <span>{modalidad.nombre}</span>
                                <button
                                    onClick={() => handleAsociar(modalidad.id)}
                                    className="px-2 py-1 bg-green-500 text-white rounded"
                                >
                                    Asociar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ModalidadesTitulacion;
