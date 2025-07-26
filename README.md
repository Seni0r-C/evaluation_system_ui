# Sistema de Gestión de Calificaciones

## Resumen del Proyecto

El Sistema de Gestión de Calificaciones es una aplicación web moderna diseñada para optimizar y automatizar la administración de trabajos de titulación y sus correspondientes calificaciones en instituciones educativas. La plataforma ofrece una interfaz intuitiva y eficiente para estudiantes, docentes y personal administrativo, facilitando el seguimiento de los procesos de evaluación desde la entrega del anteproyecto hasta la defensa final.

## Características Principales

- **Gestión de Trabajos de Titulación:** Permite a los estudiantes registrar y dar seguimiento a sus trabajos de titulación, incluyendo la entrega de anteproyectos y trabajos finales.
- **Calificación por Rúbricas:** Los docentes y miembros del tribunal pueden calificar los trabajos de manera objetiva y transparente utilizando rúbricas personalizables.
- **Asignación de Tribunales:** Facilita la asignación de tribunales de evaluación y la programación de fechas de defensa.
- **Generación de Documentos:** Automatiza la creación de actas y otros documentos relevantes para el proceso de titulación.
- **Control de Acceso Basado en Roles:** El sistema cuenta con un robusto sistema de permisos y roles que garantiza que cada usuario solo pueda acceder a las funcionalidades que le corresponden.
- **Interfaz Intuitiva:** La interfaz de usuario está diseñada para ser fácil de usar y accesible, mejorando la experiencia de todos los usuarios.

## Tecnologías Utilizadas

Este proyecto está construido con un stack de tecnologías modernas de JavaScript, enfocado en la creación de interfaces de usuario dinámicas y eficientes.

- **React:** Biblioteca principal para la construcción de la interfaz de usuario.
- **React Router:** Para la gestión de rutas y navegación dentro de la aplicación.
- **Vite:** Herramienta de desarrollo y empaquetado de alta velocidad.
- **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizable.
- **Axios:** Cliente HTTP para la comunicación con la API del backend.
- **Heroicons:** Colección de íconos SVG de alta calidad.
- **Recharts:** Biblioteca de gráficos para la visualización de datos.

## Estructura del Proyecto

El proyecto sigue una estructura organizada por funcionalidades, lo que facilita la localización y el mantenimiento del código.

```
/src
|-- assets/         # Imágenes y otros recursos estáticos
|-- components/     # Componentes de React reutilizables
|-- context/        # Proveedores de contexto de React (Autenticación, Permisos, etc.)
|-- hooks/          # Hooks personalizados de React
|-- pages/          # Componentes que representan las páginas de la aplicación
|-- routes/         # Configuración de las rutas de la aplicación
|-- services/       # Lógica para la comunicación con la API
|-- styles/         # Archivos de estilos globales
`-- utils/          # Funciones de utilidad y constantes
```

## Instalación y Configuración

Sigue estos pasos para configurar el entorno de desarrollo local:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd evaluation_system_ui
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` a un nuevo archivo. Puedes nombrarlo de las siguientes maneras según el entorno:
     - `.env`: Para todas las variables de entorno.
     - `.env.development`: Para variables específicas del entorno de desarrollo.
     - `.env.production`: Para variables específicas del entorno de producción.
   - Modifica el archivo `.env` (o el que hayas creado) con la URL de la API del backend y otras configuraciones necesarias.

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
- `npm run preview`: Inicia un servidor local para previsualizar la compilación de producción.


## Autores

- Arteaga Toro Carlos Luis
- Rodriguez Zambrano Jostin Andres