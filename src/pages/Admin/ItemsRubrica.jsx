/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getTiposEvaluacion, createTipoEvaluacion, updateTipoEvaluacion, deleteTipoEvaluacion, createTipoEvaluacionJerarquia, updateTipoEvaluacionJerarquia, deleteTipoEvaluacionJerarquia, getTiposEvaluacionJerarquia } from '../../services/rubricaService';
import { getRubricas, createRubrica, updateRubrica, deleteRubrica } from '../../services/rubricaService';
import { getRubricaCriterios, createRubricaCriterio, updateRubricaCriterio, deleteRubricaCriterio } from '../../services/rubricaService';
import TipoEvaluacionForm from '../../components/formularios/TipoEvaluacionForm';
import TipoEvaluacionList from '../../components/listas/TipoEvaluacionList';
import RubricaForm from '../../components/formularios/RubricaForm';
import RubricaList from '../../components/listas/RubricaList';
import RubricaCriterioForm from '../../components/formularios/RubricaCriterioForm';
import RubricaCriterioList from '../../components/listas/RubricaCriterioList';
import RubricaCriterios from '../Admin/RubricaCriterios';
import axiosInstance from '../../services/axiosConfig';
import TipoEvaluacionJerarquiaForm from '../../components/formularios/TipoEvaluacionJerarquiaForm';
import TipoEvaluacionJerarquiaList from '../../components/listas/TipoEvaluacionJerarquiaList';
import { useMessage } from '../../hooks/useMessage';

function App() {
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]);
    const [tiposEvaluacionJerarquia, setTiposEvaluacionJerarquia] = useState([]);
    const [rubricas, setRubricas] = useState([]);
    const [rubricaCriterios, setRubricaCriterios] = useState([]);
    const [modalidades, setModalidades] = useState([]);

    const { showMsg } = useMessage();

    const [selectedTipoEvaluacion, setSelectedTipoEvaluacion] = useState(null);
    const [selectedTipoEvaluacionJerarquia, setSelectedTipoEvaluacionJerarquia] = useState(null);
    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [selectedRubricaCriterio, setSelectedRubricaCriterio] = useState(null);

    const [activeTab, setActiveTab] = useState("tipoEvaluacion");

    const fetchTiposEvaluacion = async () => {
        try {
            const response = await getTiposEvaluacion();
            setTiposEvaluacion(response.data);
        } catch (error) {
            console.error('Error al cargar los tipos de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al cargar tipos de evaluación" });
        }
    };

    const fetchTiposEvaluacionJerarquia = async () => {
        try {
            const response = await getTiposEvaluacionJerarquia();
            setTiposEvaluacionJerarquia(response.data);
        } catch (error) {
            console.error('Error al cargar los tipos de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al cargar tipos de evaluación" });
        }
    };

    const fetchRubricas = async () => {
        try {
            const response = await getRubricas();
            setRubricas(response.data);
        } catch (error) {
            console.error('Error al cargar las rúbricas', error);
            showMsg({ typeMsg: "error", message: "Error al cargar rúbricas" });
        }
    };

    const fetchRubricaCriterios = async () => {
        try {
            const response = await getRubricaCriterios();
            setRubricaCriterios(response.data);
        } catch (error) {
            console.error('Error al cargar los criterios de rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al cargar criterios de rúbrica" });
        }
    };

    const fetchModalidades = async () => {
        try {
            const response = await axiosInstance.get('/modalidad-titulacion/listar');
            setModalidades(response.data);
        } catch (error) {
            console.error('Error al cargar las modalidades', error);
            showMsg({ typeMsg: "error", message: "Error al cargar modalidades" });
        }
    };

    useEffect(() => {
        fetchModalidades();
        fetchTiposEvaluacion();
        fetchRubricas();
        fetchRubricaCriterios();
        fetchTiposEvaluacionJerarquia();
    }, []);

    // Métodos para manejar los Tipos de Evaluación
    const handleCreateTipoEvaluacion = async (data) => {
        try {
            const response = await createTipoEvaluacion(data);
            setTiposEvaluacion([...tiposEvaluacion, response.data]);
            fetchTiposEvaluacion();
        } catch (error) {
            console.error('Error al crear el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al crear tipo de evaluación" });
        }
    };

    const handleUpdateTipoEvaluacion = async (id, data) => {
        try {
            const response = await updateTipoEvaluacion(id, data);
            setTiposEvaluacion(tiposEvaluacion.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al actualizar tipo de evaluación" });
        }
    };

    const handleDeleteTipoEvaluacion = async (id) => {
        try {
            await deleteTipoEvaluacion(id);
            setTiposEvaluacion(tiposEvaluacion.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al eliminar tipo de evaluación" });
        }
    };

    // Métodos para manejar las Jerarquías de los Tipos de Evaluación
    const handleCreateTipoEvaluacionJerarquia = async (data) => {
        try {
            const response = await createTipoEvaluacionJerarquia(data);
            // setTiposEvaluacionJerarquia([...tiposEvaluacion, response.data]);
            setTiposEvaluacionJerarquia([...tiposEvaluacionJerarquia, response.data]);
            fetchTiposEvaluacionJerarquia();
        } catch (error) {
            console.error('Error al crear el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al crear tipo de evaluación" });
        }
    };

    const handleUpdateTipoEvaluacionJerarquia = async (id, data) => {
        try {
            const response = await updateTipoEvaluacionJerarquia(id, data);
            setTiposEvaluacionJerarquia(tiposEvaluacion.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al actualizar tipo de evaluación" });
        }
    };

    const handleDeleteTipoEvaluacionJerarquia = async (id) => {
        try {
            await deleteTipoEvaluacionJerarquia(id);
            setTiposEvaluacionJerarquia(tiposEvaluacion.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar el tipo de evaluación', error);
            showMsg({ typeMsg: "error", message: "Error al eliminar tipo de evaluación" });
        }
    };

    // Métodos para manejar las Rúbricas
    const handleCreateRubrica = async (data) => {
        try {
            const response = await createRubrica(data);
            setRubricas([...rubricas, response.data]);
            fetchRubricas();
        } catch (error) {
            console.error('Error al crear la rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al crear rúbrica" });
        }
    };

    const handleUpdateRubrica = async (id, data) => {
        try {
            const response = await updateRubrica(id, data);
            setRubricas(rubricas.map(item => item.id === id ? response.data : item));
            fetchRubricas();
        } catch (error) {
            console.error('Error al actualizar la rúbrica', error);
        }
    };

    const handleDeleteRubrica = async (id) => {
        try {
            await deleteRubrica(id);
            setRubricas(rubricas.filter(item => item.id !== id));
            showMsg({ typeMsg: "success", message: "Rúbrica eliminada correctamente" });
        } catch (error) {
            console.error('Error al eliminar la rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al eliminar rúbrica" });
        }
    };

    // Métodos para manejar los Criterios de Rubrica
    const handleCreateRubricaCriterio = async (data) => {
        try {
            const response = await createRubricaCriterio(data);
            setRubricaCriterios([...rubricaCriterios, response.data]);
            fetchRubricaCriterios();
        } catch (error) {
            console.error('Error al crear el criterio de rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al crear criterio de rúbrica" });
        }
    };

    const handleUpdateRubricaCriterio = async (id, data) => {
        try {
            const response = await updateRubricaCriterio(id, data);
            setRubricaCriterios(rubricaCriterios.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar el criterio de rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al actualizar criterio de rúbrica" });
        }
    };

    const handleDeleteRubricaCriterio = async (id) => {
        try {
            await deleteRubricaCriterio(id);
            setRubricaCriterios(rubricaCriterios.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar el criterio de rúbrica', error);
            showMsg({ typeMsg: "error", message: "Error al eliminar criterio de rúbrica" });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Administrar Evaluaciones</h1>

            {/* Pestañas */}
            <div className="border-b mb-4">
                <nav className="flex space-x-4">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "tipoEvaluacion"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab("tipoEvaluacion")}
                    >
                        Tipos de Evaluación
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "tipoEvaluacionJerarquia"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab("tipoEvaluacionJerarquia")}
                    >
                        Tipos de Evaluación Jerarquía
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "rubricas"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab("rubricas")}
                    >
                        Rúbricas
                    </button>
                    {/* <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "criterios"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab("criterios")}
                    >
                        Criterios de Rúbrica
                    </button> */}
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "criterios2"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab("criterios2")}
                    >
                        Gestión de Criterios de Rúbrica
                    </button>
                </nav>
            </div>

            {/* Contenido de las pestañas */}
            <div>
                {activeTab === "tipoEvaluacion" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Tipos de Evaluación</h2>
                        <TipoEvaluacionForm
                            onCreate={handleCreateTipoEvaluacion}
                            onUpdate={handleUpdateTipoEvaluacion}
                            selected={selectedTipoEvaluacion}
                            setSelected={setSelectedTipoEvaluacion}
                        />
                        <TipoEvaluacionList
                            tiposEvaluacion={tiposEvaluacion}
                            onDelete={handleDeleteTipoEvaluacion}
                            onSelect={setSelectedTipoEvaluacion}
                        />
                    </section>
                )}
                {activeTab === "tipoEvaluacionJerarquia" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Tipos de Evaluación</h2>
                        <TipoEvaluacionJerarquiaForm
                            onCreate={handleCreateTipoEvaluacionJerarquia}
                            onUpdate={handleUpdateTipoEvaluacionJerarquia}
                            selected={selectedTipoEvaluacionJerarquia}
                            setSelected={setSelectedTipoEvaluacionJerarquia}
                            tiposEvaluacion={tiposEvaluacion}
                            modalidades={modalidades}
                        />
                        <TipoEvaluacionJerarquiaList
                            jerarquias={tiposEvaluacionJerarquia}
                            onDelete={handleDeleteTipoEvaluacionJerarquia}
                            onSelect={setSelectedTipoEvaluacionJerarquia}
                        />
                    </section>
                )}
                {activeTab === "rubricas" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Rúbricas</h2>
                        <RubricaForm
                            onCreate={handleCreateRubrica}
                            onUpdate={handleUpdateRubrica}
                            selected={selectedRubrica}
                            setSelected={setSelectedRubrica}
                            modalidades={modalidades}
                            tipoEvaluaciones={tiposEvaluacion}
                        />
                        <RubricaList
                            rubricas={rubricas}
                            onDelete={handleDeleteRubrica}
                            onSelect={setSelectedRubrica}
                        />
                    </section>
                )}
                {activeTab === "criterios" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Criterios de Rúbrica</h2>
                        <RubricaCriterioForm
                            onCreate={handleCreateRubricaCriterio}
                            onUpdate={handleUpdateRubricaCriterio}
                            selected={selectedRubricaCriterio}
                            setSelected={setSelectedRubricaCriterio}
                        />
                        <RubricaCriterioList
                            rubricaCriterios={rubricaCriterios}
                            onDelete={handleDeleteRubricaCriterio}
                            onSelect={setSelectedRubricaCriterio}
                        />
                    </section>
                )}
                {activeTab === "criterios2" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4"> Gestión de Criterios de Rúbrica</h2>
                        <RubricaCriterios />
                    </section>
                )}
            </div>
        </div>
    );
}

export default App;
