import axiosInstance from './axiosConfig';

export const obtenerEstados = (setResults) => {
    axiosInstance.get(`/trabajo-titulacion/estados`)
        .then(response => {
            if (response.data.exito === true) {
                // Obtener los estados de la respuesta
                const estados = response.data.estados.map(estado => estado.nombre);

                // Actualizar el resultado
                setResults(estados);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al buscar estados:', error));
};

export const obtenerUnTrabajo = (setResults, idTrabajo) => {
    axiosInstance.get(`/trabajo-titulacion/obtener/${idTrabajo}`)
        .then(response => {
            if (!response.error) {
                // alert(JSON.stringify(response, null, 2));                
                // Obtener los estados de la respuesta
                const trabajo = response.data;

                // Actualizar el resultado
                setResults(trabajo);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al obtener el trabajo:', error));
};

export const obtenerUnTrabajo2 = async (setResults, idTrabajo) => {
    try {
        const response = await axiosInstance.get(`/trabajo-titulacion/obtener/${idTrabajo}`);

        if (response?.data) {
            setResults(response.data);
            return { typeMsg: 'success', message: 'Trabajo obtenido correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'La respuesta de la API no contiene datos válidos.' };
        }
    } catch (error) {
        console.error('Error al obtener el trabajo:', error);
        return { typeMsg: 'error', message: 'Error al obtener el trabajo.' };
    }
};


export const subirTrabajoFinal = async (trabajo, link) => {
    try {
      const response = await axiosInstance.patch(`/trabajo-titulacion/actualizar/${trabajo}`, {
        link_final: link,
      });
  
      if (response?.data) {
        return { typeMsg: 'success', message: 'Trabajo final actualizado correctamente.' };
      } else {
        return { typeMsg: 'error', message: 'La respuesta de la API no contiene datos válidos.' };
      }
    } catch (error) {
      console.error('Error al subir el trabajo final:', error);
      return { typeMsg: 'error', message: 'Error al subir el trabajo final.' };
    }
  };
  