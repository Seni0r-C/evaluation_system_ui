import axiosInstance from './axiosConfig';
import { ensureFileExtension } from '../utils/fileUtility';

// Función para obtener el acta
export const generarActa = async (trabajo) => {
  try {
    // const responseFileName = await axiosInstance.get(`acta/pdf-name/${trabajo.id}`);
    const responseFileName = await axiosInstance.get(`acta/pdf-name/2`);
    const fileName = responseFileName.data.fileName;
    // return { typeMsg: 'success', message: JSON.stringify(responseFileName.data.fileName, null, 2) };
    const responseDoc = await axiosInstance.get(`acta/pdf/${fileName}`, {
      responseType: 'blob', // Esto es importante para manejar archivos binarios
    });

    if (responseDoc?.error) {
      return { typeMsg: 'error', message: responseDoc.message };
    }
    // Crea un enlace de descarga para el archivo
    const url = window.URL.createObjectURL(new Blob([responseDoc.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = ensureFileExtension(fileName, 'pdf'); // Nombre del archivo de descarga
    a.click();
    return { typeMsg: 'success', message: 'Acta generada exitosamente.'};
  } catch (error) {
    console.error('Error al generar el acta en el cliente:', error);
    return { typeMsg: 'error', message: 'Error al generar el acta en el cliente.' };
  }
};

