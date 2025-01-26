import axiosInstance from "./axiosConfig";

// Tipos de Evaluación
export const getTiposEvaluacion = () => axiosInstance.get(`/calificacion/tipo-evaluacion`);
export const createTipoEvaluacion = (data) => axiosInstance.post(`/calificacion/tipo-evaluacion`, data);
export const updateTipoEvaluacion = (id, data) => axiosInstance.put(`/calificacion/tipo-evaluacion/${id}`, data);
export const deleteTipoEvaluacion = (id) => axiosInstance.delete(`/calificacion/tipo-evaluacion/${id}`);

// Rúbricas
export const getRubricas = () => axiosInstance.get(`/calificacion/rubrica`);
export const createRubrica = (data) => axiosInstance.post(`/calificacion/rubrica`, data);
export const updateRubrica = (id, data) => axiosInstance.put(`/calificacion/rubrica/${id}`, data);
export const deleteRubrica = (id) => axiosInstance.delete(`/calificacion/rubrica/${id}`);

// Criterios de Rubrica
export const getRubricaCriterios = () => axiosInstance.get(`/calificacion/rubrica-criterio`);
export const createRubricaCriterio = (data) => axiosInstance.post(`/calificacion/rubrica-criterio`, data);
export const updateRubricaCriterio = (id, data) => axiosInstance.put(`/calificacion/rubrica-criterio/${id}`, data);
export const deleteRubricaCriterio = (id) => axiosInstance.delete(`/calificacion/rubrica-criterio/${id}`);
