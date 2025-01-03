import { ADMINISTRADOR, VICEDECANO, SECRETARIA, TUTOR, ESTUDIANTE } from './roles';

const VER_DETALLES_TRABAJO_TITULACION = [
    ADMINISTRADOR, 
    VICEDECANO,
    SECRETARIA,
    ESTUDIANTE
];

const ROLES_ASIGNACION_TRIBUNAL = [
    ADMINISTRADOR, 
    VICEDECANO
];

const ROLES_EDICION_MODALIDADES = [
    ADMINISTRADOR,
    VICEDECANO,
    SECRETARIA
];
const ROLES_EDICION_ITEMS_REVISTA = [
    ADMINISTRADOR,
    VICEDECANO,
    SECRETARIA
];

const ROLES_EDICION_ITEMS_RUBRICA = [
    ADMINISTRADOR,
    VICEDECANO,
    SECRETARIA
];

const ROLES_GENERACION_DOCUMENTO_CALIFICACION = [
    ADMINISTRADOR, 
    VICEDECANO, 
    SECRETARIA
];

const ROLES_REGISTRO_TRABAJO = [
    ADMINISTRADOR, 
    VICEDECANO, 
    TUTOR
];

const ROLES_CALIFICACION_TRABAJOS = [
    ADMINISTRADOR, 
    VICEDECANO
];

const ROLES_EDICION_TRABAJOS = [
    ADMINISTRADOR, 
    VICEDECANO
];

const ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS = [
    ADMINISTRADOR, 
    VICEDECANO
];

const ROLES_VER_TODOS_LOS_REGISTROS_DE_TRABAJOS = [
    ADMINISTRADOR,
    VICEDECANO,
    SECRETARIA
];

const permisos = {
    VER_DETALLES_TRABAJO_TITULACION,
    ROLES_VER_TODOS_LOS_REGISTROS_DE_TRABAJOS,
    ROLES_EDICION_TRABAJOS,
    ROLES_ASIGNACION_TRIBUNAL, 
    ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS,
    ROLES_EDICION_MODALIDADES,
    ROLES_EDICION_ITEMS_REVISTA,
    ROLES_EDICION_ITEMS_RUBRICA,
    ROLES_GENERACION_DOCUMENTO_CALIFICACION,
    ROLES_REGISTRO_TRABAJO,
    ROLES_CALIFICACION_TRABAJOS,
};

export {
    VER_DETALLES_TRABAJO_TITULACION,
    ROLES_VER_TODOS_LOS_REGISTROS_DE_TRABAJOS,
    ROLES_EDICION_TRABAJOS,
    ROLES_ASIGNACION_TRIBUNAL, 
    ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS,
    ROLES_EDICION_MODALIDADES,
    ROLES_EDICION_ITEMS_REVISTA,
    ROLES_EDICION_ITEMS_RUBRICA,
    ROLES_GENERACION_DOCUMENTO_CALIFICACION,
    ROLES_REGISTRO_TRABAJO,
    ROLES_CALIFICACION_TRABAJOS
};

export {permisos};