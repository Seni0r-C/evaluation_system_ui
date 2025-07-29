import axiosInstance from './axiosConfig';

// Función para obtener el acta
export const getIndicesRevistasService = async () => {
  try {
    const responseIndexationMagazines = await axiosInstance.get(`/indexacion-revista/`);
    if (responseIndexationMagazines?.error) {
      return { typeMsg: 'error', message: responseIndexationMagazines.message };
    }
    return responseIndexationMagazines.data;
  } catch (error) {
    console.error('Error al obtener datos de indexación de revistas:', error);
    return { typeMsg: 'error', message: 'Error al obtener datos de indexación de revistas.' };
  }
};

// Función para obtener el acta
export const createIndiceRevistasService = async (name, value, porcentaje) => {
  try {
    porcentaje = parseFloat(porcentaje);
    const response = await axiosInstance.post(`/indexacion-revista/`, { name, value, porcentaje });
    if (response.data) {
      return response.data;
    } else {
      return {
        typeMsg: 'error',
        message: 'Error en la respuesta del servidor al crear el indice.'
      };
    }
  } catch (error) {
    console.error('Error al createIndiceRevistaService:', error);
    return {
      typeMsg: 'error',
      message: 'Error en el cliente al crear el indice.'
    };
  }
};

export const updateIndiceRevistaService = async (id, name, value, porcentaje) => {
  try {
    porcentaje = parseFloat(porcentaje);
    const response = await axiosInstance.put(`/indexacion-revista/${id}`, { name, value, porcentaje });
    if (response.data) {
      return response.data;
    } else {
      return {
        typeMsg: 'error',
        message: 'Error en la respuesta del servidor al actualizar el indice.'
      };
    }
  } catch (error) {
    console.error('Error al updateIndiceRevistaService:', error);
    return {
      typeMsg: 'error',
      message: 'Error en el cliente al actualizar el indice.'
    };
  }
};

export const deleteIndiceRevistaService = async (id) => {
  try {
    const response = await axiosInstance.delete(`/indexacion-revista/${id}`, { id });
    if (response.data) {
      return response.data;
    } else {
      return {
        typeMsg: 'error',
        message: 'Error en la respuesta del servidor al eliminar el indice.'
      };
    }
  } catch (error) {
    console.error('Error al deleteIndiceRevistaService:', error);
    return {
      typeMsg: 'error',
      message: 'Error en el cliente al eliminar el indice.'
    };
  }
};



