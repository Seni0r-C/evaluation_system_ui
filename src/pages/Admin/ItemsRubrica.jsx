// Import React and Tailwind CSS
import { useState, useEffect } from "react";

const ItemsRubrica = () => {
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]); // Mock evaluation types from API
    const [items, setItems] = useState([]); // List of rubric items
    const [filteredItems, setFilteredItems] = useState([]); // Filtered items based on selected type
    const [selectedTipoEvaluacion, setSelectedTipoEvaluacion] = useState(""); // Selected type for filtering and adding

    const [newItemName, setNewItemName] = useState("");
    const [newItemValue, setNewItemValue] = useState("");

    // Mock fetching data from an API
    useEffect(() => {
        // Simulate fetching tiposEvaluacion from API
        setTimeout(() => {
            setTiposEvaluacion(["DEFENZA", "ESCRITO"]);
        }, 500);

        // Simulate fetching rubric items from API
        setTimeout(() => {
            const initialItems = [
                { id: 1, tipo_evaluacion: "DEFENZA", item: "Demuestra dominio del tema.", valor: 10 },
                { id: 2, tipo_evaluacion: "ESCRITO", item: "Los objetivos están en verbo infinitivo.", valor: 4 },
            ];
            setItems(initialItems);
            setFilteredItems([]); // Initially no items filtered until a type is selected
        }, 500);
    }, []);

    const handleAddItem = () => {
        if (selectedTipoEvaluacion.trim() && newItemName.trim() && newItemValue.trim()) {
            const newItem = {
                id: items.length + 1,
                tipo_evaluacion: selectedTipoEvaluacion,
                item: newItemName,
                valor: parseInt(newItemValue, 10),
            };
            const updatedItems = [...items, newItem];
            setItems(updatedItems);

            // Update filtered items if the new item matches the selected type
            if (newItem.tipo_evaluacion === selectedTipoEvaluacion) {
                setFilteredItems([...filteredItems, newItem]);
            }

            // Clear input fields
            setNewItemName("");
            setNewItemValue("");
        }
    };

    const handleRemoveItem = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);

        // Update filtered items
        setFilteredItems(updatedItems.filter((item) => item.tipo_evaluacion === selectedTipoEvaluacion));
    };

    const handleTipoEvaluacionChange = (tipo) => {
        setSelectedTipoEvaluacion(tipo);
        // Filter items based on selected evaluation type
        setFilteredItems(items.filter((item) => item.tipo_evaluacion === tipo));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Administrar Ítems de Rúbrica</h1>

            {/* Add Item */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Ítem de Rúbrica</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Tipo de Evaluación</label>
                        <select
                            value={selectedTipoEvaluacion}
                            onChange={(e) => handleTipoEvaluacionChange(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {tiposEvaluacion.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Descripción del Ítem</label>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Ej: Demuestra dominio del tema."
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Valor</label>
                        <input
                            type="number"
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            placeholder="Ej: 10"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddItem}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={!selectedTipoEvaluacion}
                >
                    Agregar Ítem
                </button>
            </div>

            {/* List of Items */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Ítems de Rúbrica</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Tipo de Evaluación</th>
                            <th className="border border-gray-300 p-2">Descripción del Ítem</th>
                            <th className="border border-gray-300 p-2">Valor</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-gray-300 p-2">{item.tipo_evaluacion}</td>
                                <td className="border border-gray-300 p-2">{item.item}</td>
                                <td className="border border-gray-300 p-2 text-center">{item.valor}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

export default ItemsRubrica;
