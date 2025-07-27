## 3.5. EVALUACIÓN DE LA PROPUESTA

En el proceso de validación se implementó un enfoque dual para garantizar la calidad del sistema el cual se componía por lo siguiente:

- 1. Metodología de Pruebas

**Pruebas de Caja Blanca:** Se examinó exhaustivamente la lógica interna del backend, incluyendo:

- Flujos de autenticación (validación de tokens JWT y credenciales institucionales)
- Control de acceso mediante middlewares (verifyToken, verifyRoles)
- Procesos críticos como el cálculo automático de calificaciones y generación de actas PDF

**Pruebas de Caja Negra**: Se simuló el comportamiento de usuarios finales verificando:

- Completa funcionalidad de formularios (validación en tiempo real, mensajes de error)
- Restricciones de acceso según roles (Docente, Secretaría, Decano)
- Flujos completos como registro de trabajos → asignación de tribunal → evaluación
    1. Cobertura de pruebas.

Los módulos se dividieron estratégicamente en:

- Grupo A (Caja Blanca):

Autenticación, donde se probaron 12 escenarios distintos de credenciales (válidas, inválidas, caducadas)

Permisos, en el que se verificaron 15 combinaciones de roles/rutas protegidas

Rúbricas donde la validación matemática de cálculos de puntuación con casos límite

- Grupo B (Caja Negra):

Pruebas E2E con 8 perfiles de usuario distintos

Validación de 20+ formularios con datos frontera (ej: títulos con 255 caracteres)

Pruebas de usabilidad en dispositivos móviles y desktop

1. Documentación de resultados.

Los hallazgos se registraron en matrices detalladas que incluyeron:

_Tabla 34: Resultados de pruebas de validación_

| Función Probada | Tipo Prueba | Entrada | Resultado Esperado | Estado |
| --- | --- | --- | --- | --- |
| Login (Cred. válidas) | Caja Blanca | usuario: [docente@utm.edu.ec](https://mailto:docente@utm.edu.ec/) | Token JWT generado | ✔️  |
| Crear modalidad | Caja Negra | Nombre: "Artículo indexado" | Registro en BD | ✔️  |
| Calificar trabajo | Híbrida | Puntaje: 4.5/5 | Promedio calculado: 90% | ✔️  |

Fuente: Autores

1. Impacto Obtenido
    - - Identificación y corrección de 15 edge cases durante pruebas unitarias
        - Reducción en errores de UI/UX tras iterar con feedback real
        - Cobertura del 92% en funciones críticas (SonarQube)

Esta estrategia aseguró un sistema robusto, cumpliendo con los requisitos académicos y estándares de calidad para su implementación en producción. Los casos de prueba permanecen documentados para futuras iteraciones del sistema.

_Tabla 35: Resultados Pruebas de Caja Blanca_

| **N.º** | **Funcionalidad** | **Entrada de prueba** | **Resultado esperado** | **Resultado obtenido** | **Estado** |
| --- | --- | --- | --- | --- | --- |
| 1   | Ingreso al sistema | Usuario: admin, Pass: 1234 | Genera token JWT válido | Token JWT generado y almacenado en sesión | ✔️  |
| 2   | Verificación de permisos (Admin) | Token de usuario con rol 3 | Acceso permitido a rutas /usuarios, /roles | Acceso concedido correctamente | ✔️  |
| 3   | Calificación con ítem duplicado | POST calificación con rubrica_criterio_id = 22 (ya registrado) | Rechazo por duplicación | Error 400: "criterio ya calificado" | ✔️  |
| 4   | Generación de acta final | ID de proyecto calificado | Acta PDF con datos de calificaciones | PDF generado correctamente con los datos esperados | ✔️  |

Fuente: Autores

_Tabla 36: Resultados Pruebas de Caja Negra_

| **N.º** | **Funcionalidad** | **Acción del usuario** | **Resultado esperado** | **Resultado obtenido** | **Estado** |
| --- | --- | --- | --- | --- | --- |
| 1   | Gestión de datos (modalidades) | Crear nueva modalidad “Integración Curricular” | Modalidad registrada y visible en el listado | Aparece correctamente en tabla | ✔️  |
| 2   | Registro de trabajo de titulación | Ingreso de tema, modalidad y estudiantes | Proyecto guardado correctamente | Proyecto se visualiza con estado "pendiente" | ✔️  |
| 3   | Asignación de tribunal | Selección de docente A, B, C como tribunal | Tribunal asignado al proyecto | Aparece tribunal asignado al consultar el proyecto | ✔️  |
| 4   | Monitoreo del proceso | Acceso al panel de estado de calificación | Muestra barras de avance y estado de rúbricas | Visualización correcta de estado por proyecto | ✔️  |

Fuente: Autores