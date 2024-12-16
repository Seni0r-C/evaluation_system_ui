// Import React and Tailwind CSS
import { useState, useEffect } from "react";

const ItemsRevista = () => {
    const [items, setItems] = useState([]); // List of items
    const [newItemName, setNewItemName] = useState("");
    const [newItemPercentage, setNewItemPercentage] = useState("");    
    // Mock data fetching (replace with API calls)
    useEffect(() => {
        // Replace with real API calls
        setItems([
            { id: 1, nombre: "Scopus", porcentaje_defensa: "80%" },
            { id: 2, nombre: "LatinIndex (>=2.8)", porcentaje_defensa: "60%" },
        ]);
    }, []);

    const handleAddItem = () => {
        if (newItemName.trim() !== "" && newItemPercentage.trim() !== "") {
            setItems([
                ...items,
                {
                    id: items.length + 1,
                    nombre: newItemName,
                    porcentaje_defensa: newItemPercentage,
                },
            ]);
            setNewItemName("");
            setNewItemPercentage("");
        }
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Administrar Ítems de Revista</h1>

            {/* Add Item */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Ítem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Nombre del Ítem</label>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Ej: Scopus"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Porcentaje para la Defensa</label>
                        <input
                            type="text"
                            value={newItemPercentage}
                            onChange={(e) => setNewItemPercentage(e.target.value)}
                            placeholder="Ej: 20%"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddItem}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Agregar Ítem
                </button>
            </div>

            {/* List of Items */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Ítems de Revista</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Nombre del Ítem</th>
                            <th className="border border-gray-300 p-2">Porcentaje para la Defensa</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-gray-300 p-2">{item.nombre}</td>
                                <td className="border border-gray-300 p-2">{item.porcentaje_defensa}</td>
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

export default ItemsRevista;
