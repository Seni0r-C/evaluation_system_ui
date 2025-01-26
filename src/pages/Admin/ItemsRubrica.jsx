import { useState, useEffect } from 'react';
import { getTiposEvaluacion, createTipoEvaluacion, updateTipoEvaluacion, deleteTipoEvaluacion } from '../../services/rubricaService';
import { getRubricas, createRubrica, updateRubrica, deleteRubrica } from '../../services/rubricaService';
import { getRubricaCriterios, createRubricaCriterio, updateRubricaCriterio, deleteRubricaCriterio } from '../../services/rubricaService';
import TipoEvaluacionForm from '../../components/formularios/TipoEvaluacionForm';
import TipoEvaluacionList from '../../components/listas/TipoEvaluacionList';
import RubricaForm from '../../components/formularios/RubricaForm';
import RubricaList from '../../components/listas/RubricaList';
import RubricaCriterioForm from '../../components/formularios/RubricaCriterioForm';
import RubricaCriterioList from '../../components/listas/RubricaCriterioList';



function App() {
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]);
    const [rubricas, setRubricas] = useState([]);
    const [rubricaCriterios, setRubricaCriterios] = useState([]);

    const [selectedTipoEvaluacion, setSelectedTipoEvaluacion] = useState(null);
    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [selectedRubricaCriterio, setSelectedRubricaCriterio] = useState(null);

    // Cargar Tipos de Evaluación al iniciar
    useEffect(() => {
        const fetchTiposEvaluacion = async () => {
            try {
                const response = await getTiposEvaluacion();
                setTiposEvaluacion(response.data);
            } catch (error) {
                console.error('Error al cargar los tipos de evaluación', error);
            }
        };
        fetchTiposEvaluacion();
    }, []);

    // Cargar Rúbricas al iniciar
    useEffect(() => {
        const fetchRubricas = async () => {
            try {
                const response = await getRubricas();
                setRubricas(response.data);
            } catch (error) {
                console.error('Error al cargar las rúbricas', error);
            }
        };
        fetchRubricas();
    }, []);

    // Cargar Criterios de Rubrica al iniciar
    useEffect(() => {
        const fetchRubricaCriterios = async () => {
            try {
                const response = await getRubricaCriterios();
                setRubricaCriterios(response.data);
            } catch (error) {
                console.error('Error al cargar los criterios de rúbrica', error);
            }
        };
        fetchRubricaCriterios();
    }, []);

    // Métodos para manejar los Tipos de Evaluación
    const handleCreateTipoEvaluacion = async (data) => {
        try {
            const response = await createTipoEvaluacion(data);
            setTiposEvaluacion([...tiposEvaluacion, response.data]);
        } catch (error) {
            console.error('Error al crear el tipo de evaluación', error);
        }
    };

    const handleUpdateTipoEvaluacion = async (id, data) => {
        try {
            const response = await updateTipoEvaluacion(id, data);
            setTiposEvaluacion(tiposEvaluacion.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar el tipo de evaluación', error);
        }
    };

    const handleDeleteTipoEvaluacion = async (id) => {
        try {
            await deleteTipoEvaluacion(id);
            setTiposEvaluacion(tiposEvaluacion.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar el tipo de evaluación', error);
        }
    };

    // Métodos para manejar las Rúbricas
    const handleCreateRubrica = async (data) => {
        try {
            const response = await createRubrica(data);
            setRubricas([...rubricas, response.data]);
        } catch (error) {
            console.error('Error al crear la rúbrica', error);
        }
    };

    const handleUpdateRubrica = async (id, data) => {
        try {
            const response = await updateRubrica(id, data);
            setRubricas(rubricas.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar la rúbrica', error);
        }
    };

    const handleDeleteRubrica = async (id) => {
        try {
            await deleteRubrica(id);
            setRubricas(rubricas.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar la rúbrica', error);
        }
    };

    // Métodos para manejar los Criterios de Rubrica
    const handleCreateRubricaCriterio = async (data) => {
        try {
            const response = await createRubricaCriterio(data);
            setRubricaCriterios([...rubricaCriterios, response.data]);
        } catch (error) {
            console.error('Error al crear el criterio de rúbrica', error);
        }
    };

    const handleUpdateRubricaCriterio = async (id, data) => {
        try {
            const response = await updateRubricaCriterio(id, data);
            setRubricaCriterios(rubricaCriterios.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error('Error al actualizar el criterio de rúbrica', error);
        }
    };

    const handleDeleteRubricaCriterio = async (id) => {
        try {
            await deleteRubricaCriterio(id);
            setRubricaCriterios(rubricaCriterios.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error al eliminar el criterio de rúbrica', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Administrar Evaluaciones</h1>

            {/* Tipo de Evaluación */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Tipos de Evaluación</h2>
                <TipoEvaluacionForm onCreate={handleCreateTipoEvaluacion} onUpdate={handleUpdateTipoEvaluacion} selected={selectedTipoEvaluacion} />
                <TipoEvaluacionList
                    tiposEvaluacion={tiposEvaluacion}
                    onDelete={handleDeleteTipoEvaluacion}
                    onSelect={setSelectedTipoEvaluacion}
                />
            </section>

            {/* Rúbrica */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Rúbricas</h2>
                <RubricaForm onCreate={handleCreateRubrica} onUpdate={handleUpdateRubrica} selected={selectedRubrica} />
                <RubricaList
                    rubricas={rubricas}
                    onDelete={handleDeleteRubrica}
                    onSelect={setSelectedRubrica}
                />
            </section>

            {/* Criterios de Rúbrica */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Criterios de Rúbrica</h2>
                <RubricaCriterioForm onCreate={handleCreateRubricaCriterio} onUpdate={handleUpdateRubricaCriterio} selected={selectedRubricaCriterio} />
                <RubricaCriterioList
                    rubricaCriterios={rubricaCriterios}
                    onDelete={handleDeleteRubricaCriterio}
                    onSelect={setSelectedRubricaCriterio}
                />
            </section>
        </div>
    );
}

export default App;
