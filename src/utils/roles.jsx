
const TODOS = 0;
const ADMIN = 1;
const SECRETARIA = 2;
const DOCENTE = 3;
const ESTUDIANTE = 4;
const VICEDECANO = 9;
const TRIBUNAL = 10;
const TUTOR = 11;
const COTUTOR = 12;
const TODOS_MENOS_ESTUDIANTE = [ADMIN, VICEDECANO, TRIBUNAL, SECRETARIA, TUTOR, COTUTOR];

const MAP_ROLE_STR = {
    1: 'Administrador',
    2: 'Secretario/a',
    3: 'Docente',
    4: 'Estudiante',
    5: 'Vicedecano',
    6: 'Tribunal',
    7: 'Tutor',
    9: 'Vicedecano',
    10: 'Miembro Tribunal',
    11: 'Tutor',
    12: 'Cotutor',
  };

export { TODOS, ADMIN, DOCENTE, TUTOR, COTUTOR, VICEDECANO, TRIBUNAL, SECRETARIA, ESTUDIANTE, TODOS_MENOS_ESTUDIANTE, MAP_ROLE_STR };
