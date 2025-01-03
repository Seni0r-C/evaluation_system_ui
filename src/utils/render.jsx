export const columnRenderer = (column) => {
    const col = column?.replace("_", " "); // Reemplazamos el guion bajo con un espacio
    return col ? col.charAt(0).toUpperCase() + col.slice(1) : ''; // Capitalizamos la primera letra
};

export const transformData = (data, apply=columnRenderer) => {
    // Si data es un array, aplicamos recursividad a cada elemento
    if (Array.isArray(data)) {
        return data.map(item => transformData(item)); // Llamamos recursivamente
    }

    if (data && typeof data === 'object') {
        const transformedData = {};
        Object.keys(data).forEach(key => {
            // Aplicamos columnRenderer a cada clave
            const newKey = apply(key);
            // Asignamos el valor original al nuevo nombre de la clave
            transformedData[newKey] = transformData(data[key]); // Recursividad para objetos anidados
        });
        return transformedData;
    }

    return data; // Si no es un objeto ni un array, devolvemos el valor tal cual
};

export const filterKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => filterKeys(item)); // Si es un array, filtramos cada objeto dentro
    }

    if (obj && typeof obj === 'object') {
        const newObj = {};
        Object.keys(obj).forEach(key => {
            // Si la clave contiene 'id', la omitimos
            if (!key.toLowerCase().split("_").includes('id')) {
                newObj[key] = filterKeys(obj[key]); // Recursividad para objetos anidados
            }
        });
        return newObj;
    }

    return obj; // Si no es un objeto ni un array, devolvemos el valor tal cual
};
