// Definir los roles una sola vez
export const ROLES = {
    ADMINISTRACION: "ADMINISTRACIÓN",
    VICEDECANATO: "VICEDECANATO",
    SECRETARIA: "SECRETARíA",
    ESTUDIANTE: "ESTUDIANTE",
    TUTOR: "TUTOR",
    DOCENTE: "DOCENTE"
};

// Agrupar los permisos reutilizando los roles
export const permisos = {
    VER_DETALLES_TRABAJO_TITULACION: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA,
        ROLES.ESTUDIANTE,
        ROLES.DOCENTE,
        ROLES.TUTOR
    ],
    ROLES_VER_TODOS_LOS_REGISTROS_DE_TRABAJOS: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_EDICION_TRABAJOS: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO
    ],
    ROLES_ASIGNACION_TRIBUNAL: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO
    ],
    ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO
    ],
    ROLES_EDICION_MODALIDADES: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_EDICION_ITEMS_REVISTA: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_EDICION_ITEMS_RUBRICA: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_GENERACION_DOCUMENTO_CALIFICACION: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_GENERACION_DOCUMENTO_EVALUACION: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.SECRETARIA
    ],
    ROLES_REGISTRO_TRABAJO: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.TUTOR
    ],
    ROLES_CALIFICACION_TRABAJOS: [
        ROLES.ADMINISTRACION,
        ROLES.VICEDECANATO,
        ROLES.DOCENTE
    ]
};