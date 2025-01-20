// Definir los estados y sus IDs en un solo lugar
export const estadosTrabajos = {
    REGISTRADO: "REGISTRADO",
    ASIGNADO: "ASIGNADO",
    CALIFICADO: "CALIFICADO",
    INFORME_GENERADO: "INFORME GENERADO",
    FINALIZADO: "FINALIZADO",
    RECHAZADO: "RECHAZADO"
};

// Asociar IDs directamente a los estados
export const estadosTrabajosIds = {
    REGISTRADO: 1,
    ASIGNADO: 2,
    CALIFICADO: 3,
    INFORME_GENERADO: 4,
    FINALIZADO: 5,
    RECHAZADO: 6
};

// Exportar los estados como valores individuales si es necesario
export const { 
    REGISTRADO, 
    ASIGNADO, 
    CALIFICADO, 
    INFORME_GENERADO, 
    FINALIZADO, 
    RECHAZADO 
} = estadosTrabajos;