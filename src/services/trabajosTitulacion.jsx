import axiosInstance from './axiosConfig';

export const obtenerEstados = (setResults) => {
    axiosInstance.get(`/trabajo-titulacion/estados`)
        .then(response => {
            if (response.data.exito == true) {
                // Obtener el valor de COLUMN_TYPE
                const columnType = response.data.estados.COLUMN_TYPE;

                // Extraer los valores del enum
                if (columnType) {
                    const estados = columnType
                        .match(/enum\(([^)]+)\)/)[1] // Extraer contenido dentro de `enum()`
                        .split(',') // Separar por coma
                        .map(item => item.trim().replace(/'/g, '')); // Limpiar las comillas y espacios

                    // Actualizar el resultado
                    setResults(estados);
                } else {
                    console.error('COLUMN_TYPE no encontrado en la respuesta.');
                }
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al buscar usuarios:', error));
};
