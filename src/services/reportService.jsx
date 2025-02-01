import axiosInstance from './axiosConfig';

// Función para obtener el acta
export const generarActa = async (trabajo) => {
  try {
    const response = await axiosInstance.get(`acta/pdf/${trabajo.id}`, {
      responseType: 'blob', // Esto es importante para manejar archivos binarios
    });

    if (response?.error) {
      return { typeMsg: 'error', message: response.message };
    }
    // Crea un enlace de descarga para el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'actita.pdf'; // Nombre del archivo de descarga
    a.click();
    return { typeMsg: 'success', message: 'Acta generada exitosamente.' };
  } catch (error) {
    console.error('Error al generar el acta:', error);
    return { typeMsg: 'error', message: 'Error al generar el acta.' };
  }
};
