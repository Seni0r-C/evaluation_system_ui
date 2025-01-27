import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";

const ModalidadesTitulacion = () => {
    const [modalidades, setModalidades] = useState([]);
    const [formData, setFormData] = useState({ nombre: "", max_participantes: "" });
    const [selectedId, setSelectedId] = useState(null);
    const [carreras, setCarreras] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState("");
    const [asociaciones, setAsociaciones] = useState([]);

    const [activeTab, setActiveTab] = useState("formulario");

    const fetchModalidades = async () => {
        try {
            const res = await axiosInstance.get("/modalidad-titulacion/listar");
            setModalidades(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCarreras = async () => {
        try {
            const res = await axiosInstance.get("/carrera/listar");
            setCarreras(res.data.datos);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAsociaciones = async (idCarrera) => {
        try {
            const res = await axiosInstance.get(`/modalidad-titulacion/listarPorCarrera/${idCarrera}`);
            setAsociaciones(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchModalidades();
        fetchCarreras();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedId) {
                await axiosInstance.put(`/modalidad-titulacion/actualizar/${selectedId}`, formData);
            } else {
                await axiosInstance.post("/modalidad-titulacion/crear", formData);
            }
            setFormData({ nombre: "", max_participantes: "" });
            setSelectedId(null);
            fetchModalidades();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (modalidad) => {
        setFormData({ nombre: modalidad.nombre, max_participantes: modalidad.max_participantes });
        setSelectedId(modalidad.id);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/modalidad-titulacion/eliminar/${id}`);
            fetchModalidades();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAsociar = async (idModalidad) => {
        try {
            await axiosInstance.post("/modalidad-titulacion/asociar", { id_carrera: selectedCarrera, id_modalidad_titulacion: idModalidad });
            fetchAsociaciones(selectedCarrera);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDesasociar = async (idModalidad) => {
        try {
            await axiosInstance.delete("/modalidad-titulacion/desasociar", { data: { id_carrera: selectedCarrera, id_modalidad_titulacion: idModalidad } });
            fetchAsociaciones(selectedCarrera);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Modalidades de Titulación</h1>
            <div className="flex space-x-4 border-b">
                <button
                    className={`py-2 px-4 ${activeTab === "formulario" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("formulario")}
                >
                    Crear Modalidad
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === "modalidades" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("modalidades")}
                >
                    Modalidades
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === "asociaciones" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("asociaciones")}
                >
                    Asociaciones
                </button>
            </div>

            {/* Formulario de Modalidades */}
            {activeTab === "formulario" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Crear o Editar Modalidad</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Máximo de Participantes</label>
                            <input
                                type="number"
                                name="max_participantes"
                                value={formData.max_participantes}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {selectedId ? "Actualizar Modalidad" : "Crear Modalidad"}
                        </button>
                        {selectedId && (
                            <button
                                type="button"
                                className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={() => { setSelectedId(null); setFormData({ nombre: "", max_participantes: "" }); setActiveTab("modalidades"); }}
                            >
                                Cancelar
                            </button>
                        )}
                    </form>
                </div>
            )}

            {/* Lista de Modalidades */}
            {activeTab === "modalidades" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Modalidades Existentes</h2>
                    <ul className="space-y-4">
                        {modalidades.map((modalidad) => (
                            <li
                                key={modalidad.id}
                                className="p-4 border rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{modalidad.nombre}</p>
                                    <p className="text-sm text-gray-600">Máximo: {modalidad.max_participantes}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => { setActiveTab("formulario"); handleEdit(modalidad); }}
                                        className="py-1 px-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(modalidad.id)}
                                        className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Gestión de Asociaciones */}
            {activeTab === "asociaciones" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Asociar Modalidades a Carreras</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seleccionar Carrera</label>
                            <select
                                onChange={(e) => {
                                    setSelectedCarrera(e.target.value);
                                    if (e.target.value) {
                                        fetchAsociaciones(e.target.value);
                                    } else {
                                        setAsociaciones([]);
                                    }
                                }}
                                value={selectedCarrera}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Seleccione una carrera</option>
                                {carreras.map((carrera) => (
                                    <option key={carrera.id} value={carrera.id}>
                                        {carrera.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedCarrera && (
                            <>
                                {/* Modalidades Asociadas */}
                                <h3 className="text-lg font-semibold">Modalidades Asociadas</h3>
                                <ul className="space-y-4">
                                    {asociaciones.length > 0 ? (
                                        asociaciones.map((asociacion) => (
                                            <li
                                                key={asociacion.id}
                                                className="p-4 border rounded-lg flex justify-between items-center"
                                            >
                                                <span className="text-gray-800">{asociacion.nombre}</span>
                                                <button
                                                    onClick={() => handleDesasociar(asociacion.id)}
                                                    className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Desasociar
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">No hay modalidades asociadas.</p>
                                    )}
                                </ul>

                                {/* Modalidades Disponibles */}
                                <h3 className="text-lg font-semibold">Modalidades Disponibles</h3>
                                <ul className="space-y-4">
                                    {modalidades
                                        .filter((modalidad) => !asociaciones.some((a) => a.id === modalidad.id))
                                        .map((modalidad) => (
                                            <li
                                                key={modalidad.id}
                                                className="p-4 border rounded-lg flex justify-between items-center"
                                            >
                                                <span className="text-gray-800">{modalidad.nombre}</span>
                                                <button
                                                    onClick={() => handleAsociar(modalidad.id)}
                                                    className="py-1 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Asociar
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalidadesTitulacion;
