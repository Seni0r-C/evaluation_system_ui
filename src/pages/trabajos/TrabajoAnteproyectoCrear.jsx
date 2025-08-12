/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import BuscadorYSelectorDeUsuarios from '../../components/utmcomps/BuscadorYSelectorDeUsuarios';
import { buscarUsuarios } from '../../services/usuarioService';
import { obtenerCarreras } from '../../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../../services/modalidadService';
import axiosInstance from '../../services/axiosConfig';
import MessageDialog from '../../components/shared/MessageDialog';
import InputField from '../../components/common/InputField';
import UserContext from '../../context/UserContext';
import PropTypes from 'prop-types';

const TrabajoAnteproyectoCrear = () => {
  // Datos de la base de datos
  const { user } = useContext(UserContext);
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [cotutores, setCotutores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [iamDocente, setIamDocente] = useState(false);

  // Datos del formulario
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedCotutor, setSelectedCotutor] = useState(null);
  const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [linkArchivo, setLinkArchivo] = useState('');

  // Búsqueda de usuarios
  const [tutorSearch, setTutorSearch] = useState('');
  const [cotutorSearch, setCotutorSearch] = useState('');
  const [estudianteSearch, setEstudianteSearch] = useState('');

  // Indices de búsqueda
  const [highlightedIndexTutor, setHighlightedIndexTutor] = useState(-1);
  const [highlightedIndexCotutor, setHighlightedIndexCotutor] = useState(-1);
  const [highlightedIndexEstudiante, setHighlightedIndexEstudiante] = useState(-1);

  // Mensajes
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [iconType, setIconType] = useState(null);

  // Funciones

  // Resetear formulario
  const resetForm = () => {
    setSelectedCarrera('');
    setSelectedModalidad('');
    setTutores([]);
    setSelectedTutor(null);
    setSelectedCotutor(null);
    setSelectedEstudiantes([]);
    setCotutores([]);
    setEstudiantes([]);
    setTitulo('');
    setLinkArchivo('');
    setTutorSearch('');
    setCotutorSearch('');
    setEstudianteSearch('');
    setHighlightedIndexTutor(-1);
    setHighlightedIndexCotutor(-1);
    setHighlightedIndexEstudiante(-1);
  };

  const isDocente = () => {
    // Verificar si el usuario es tutor
    const istutor = user.roles.some(r => r.id == 3);
    setIamDocente(istutor);
    if (istutor) {
      setSelectedTutor(user);
    }
  };

  // Obtener carreras
  useEffect(() => {
    obtenerCarreras(setCarreras);
    isDocente();
  }, []);

  // Obtener modalidades por carrera
  useEffect(() => {
    if (selectedCarrera) {
      obtenerModalidadesPorCarrera(selectedCarrera, setModalidades);
    } else {
      setModalidades([]);
      setSelectedModalidad('');
      setSelectedEstudiantes([]);
    }
  }, [selectedCarrera]);

  useEffect(() => {
    if (selectedModalidad) {
      const modalidad = modalidades.find((mod) => mod.id === parseInt(selectedModalidad));
      if (selectedEstudiantes.length > parseInt(modalidad.max_participantes)) {
        setSelectedModalidad((prev) => {
          setSelectedEstudiantes((prevSelectedEstudiantes) => prevSelectedEstudiantes.slice(0, parseInt(modalidad.max_participantes)));
          return prev;
        })
        setMessage('No puedes seleccionar más estudiantes de los permitidos para esta modalidad');
        setIconType('warning');
        setIsOpen(true);
        return;
      }
    } else {
      setSelectedEstudiantes([]);
    }
  }, [selectedModalidad]);

  // Fetch usuarios
  const buscarUsuariosConRol = (query, setResults, rol) => {
    buscarUsuarios(query, setResults, rol);
  };

  // Crear trabajo
  const handleCrearTrabajo = async (e) => {
    e.preventDefault();
    const trabajoData = {
      carrera_id: selectedCarrera,
      modalidad_id: selectedModalidad,
      tutor_id: selectedTutor.id,
      cotutor_id: selectedCotutor ? selectedCotutor.id : null,
      titulo,
      link_archivo: linkArchivo,
    };

    try {
      const respuesta = await axiosInstance.post('/trabajo-titulacion/crear', trabajoData);
      const trabajoId = respuesta.data.id;
      try {
        // Agregar estudiantes
        for (let i = 0; i < selectedEstudiantes.length; i++) {
          const estudiante = selectedEstudiantes[i];
          console.log("Vamos por este estudiante: " + estudiante.nombre);

          const response = await axiosInstance.post('/trabajo-titulacion/asociarEstudiante', {
            trabajo_id: trabajoId,
            estudiante_id: estudiante.id,
          });
          console.log(response.data);
        }
        setMessage('Trabajo de titulación creado exitosamente');
        setIconType('success');
        setIsOpen(true);
        resetForm();
      } catch (error) {
        setMessage('Error al agregar estudiantes al trabajo');
        setIconType('error');
        setIsOpen(true);
        console.error('Error al agregar estudiantes:', error.response?.data?.error || error);
      }
    } catch (error) {
      setMessage('Error al crear trabajo de titulación');
      setIconType('error');
      setIsOpen(true);
      console.error('Error al crear trabajo:', error.response?.data?.error || error);
    }
  };

  // Manejar teclas de flecha y enter
  const handleKeyDown = (e, type) => {
    const setHighlightedIndex = {
      tutor: setHighlightedIndexTutor,
      cotutor: setHighlightedIndexCotutor,
      estudiante: setHighlightedIndexEstudiante,
    }[type];

    const highlightedIndex = {
      tutor: highlightedIndexTutor,
      cotutor: highlightedIndexCotutor,
      estudiante: highlightedIndexEstudiante,
    }[type];

    const results = {
      tutor: tutores,
      cotutor: cotutores,
      estudiante: estudiantes,
    }[type];

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const selected = results[highlightedIndex];
      const setSelectedUser = {
        tutor: setSelectedTutor,
        cotutor: setSelectedCotutor,
        estudiante: (user) => setSelectedEstudiantes((prev) => [...prev, user]),
      }[type];
      setSelectedUser(selected);
      setEstudianteSearch(""); // Limpiar búsqueda
      setHighlightedIndex(-1);
    }
  };

  // Eliminar usuario de búsqueda
  const handleChipRemove = (type, user) => {
    if (type === 'tutor') {
      setSelectedTutor(null);
    } else if (type === 'cotutor') {
      setSelectedCotutor(null);
    } else if (type === 'estudiante') {
      setSelectedEstudiantes((prevSelectedEstudiantes) => prevSelectedEstudiantes.filter((est) => est.id !== user.id));
    }
  };

  // Agregar estudiante a la lista de estudiantes
  const handleEstudianteSelect = (user) => {
    if (!selectedCarrera) {
      setMessage('Debes seleccionar una carrera y modalidad antes de agregar estudiantes');
      setIconType('warning');
      setIsOpen(true);
      return;
    }
    if (!selectedModalidad) {
      setMessage('Debes seleccionar una modalidad antes de agregar estudiantes');
      setIconType('warning');
      setIsOpen(true);
      return;
    }
    try {
      const modalidad = modalidades.find((mod) => mod.id === parseInt(selectedModalidad));
      if (selectedEstudiantes.length >= parseInt(modalidad.max_participantes)) {
        setMessage('Ya has seleccionado el número máximo de estudiantes permitidos para esta modalidad');
        setIconType('warning');
        setIsOpen(true);
        return;
      }
      setSelectedEstudiantes((prevSelectedEstudiantes) => {
        if (prevSelectedEstudiantes.find(est => est.id === user.id)) {
          setMessage('Este estudiante ya está seleccionado');
          setIconType('warning');
          setIsOpen(true);
          return prevSelectedEstudiantes;
        }
        return [...prevSelectedEstudiantes, user];
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <MessageDialog message={message} isOpen={isOpen} onClose={() => setIsOpen(false)} iconType={iconType} />
      <div className="px-16 py-6 mx-auto min-h-max">
        <h1 className="text-2xl font-bold mb-6">Crear Trabajo de Titulación</h1>

        {/* Contenedor de dos columnas */}
        <form action="" onSubmit={(e) => handleCrearTrabajo(e)}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div>
              {/* Seleccionar carrera */}
              <InputField
                label="Carrera"
                type="select"
                value={selectedCarrera}
                name="carrera"
                onChange={(e) => setSelectedCarrera(e.target.value)}
                placeholder="Seleccione una carrera"
                options={carreras}
                required
                capitalize
              />

              {/* Seleccionar modalidad */}
              <InputField
                label="Modalidad"
                type="select"
                value={selectedModalidad}
                name="modalidad"
                onChange={(e) => setSelectedModalidad(e.target.value)}
                placeholder="Seleccione una modalidad"
                options={modalidades}
                required
              />

              {/* Título */}
              <InputField
                label="Título"
                type="text"
                value={titulo}
                name="titulo"
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ingrese el título del trabajo"
                required
              />

              {/* Link del archivo */}
              <InputField
                label="Link del Archivo"
                type="text"
                value={linkArchivo}
                name="linkArchivo"
                onChange={(e) => setLinkArchivo(e.target.value)}
                placeholder="Ingrese el link del archivo"
                required
              />
            </div>


            {/* Columna 2 */}
            <div >
              {/* Buscar Tutor */}
              {!iamDocente && (<BuscadorYSelectorDeUsuarios
                label="Buscar Tutor"
                placeholder="Ingrese la cédula o nombre del tutor"
                searchValue={tutorSearch}
                setSearchValue={setTutorSearch}
                searchResults={tutores}
                setSearchResults={setTutores}
                selectedUser={selectedTutor}
                setSelectedUser={setSelectedTutor}
                handleKeyDown={handleKeyDown}
                handleChipRemove={handleChipRemove}
                type="tutor"
                setHighlightedIndex={setHighlightedIndexTutor}
                highlightedIndex={highlightedIndexTutor}
                handleBuscar={buscarUsuariosConRol}
                required={true}
                role={3} // Rol para tutores
              />)}

              {/* Buscar Co-tutor */}
              <BuscadorYSelectorDeUsuarios
                label="Buscar Co-tutor"
                optional={true}
                placeholder="Ingrese la cédula o nombre del cotutor"
                searchValue={cotutorSearch}
                setSearchValue={setCotutorSearch}
                searchResults={cotutores}
                setSearchResults={setCotutores}
                selectedUser={selectedCotutor}
                setSelectedUser={setSelectedCotutor}
                handleKeyDown={handleKeyDown}
                handleChipRemove={handleChipRemove}
                type="cotutor"
                setHighlightedIndex={setHighlightedIndexCotutor}
                highlightedIndex={highlightedIndexCotutor}
                handleBuscar={buscarUsuariosConRol}
                required={false}
              />

              {/* Buscar Estudiantes */}
              <BuscadorYSelectorDeUsuarios
                label="Buscar Estudiante"
                placeholder="Ingrese la cédula o nombre del estudiante"
                searchValue={estudianteSearch}
                setSearchValue={setEstudianteSearch}
                searchResults={estudiantes}
                setSearchResults={setEstudiantes}
                selectedUser={null} // No hay uno solo seleccionado
                selectedUsers={selectedEstudiantes}
                setSelectedUser={handleEstudianteSelect} // No hay uno solo seleccionado
                handleKeyDown={handleKeyDown}
                handleChipRemove={handleChipRemove}
                type="estudiante"
                setHighlightedIndex={setHighlightedIndexEstudiante}
                highlightedIndex={highlightedIndexEstudiante}
                handleBuscar={(query, setResults) => buscarUsuariosConRol(query, setResults, 4)} // Rol para estudiantes
                required={true}
              />
            </div>
          </div>

          {/* Botón de creación */}
          <button
            type='submit'
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6">
            Crear Trabajo
          </button>

        </form>

      </div>
    </>
  );
};

TrabajoAnteproyectoCrear.propTypes = {
  iamTutor: PropTypes.bool,
};

export default TrabajoAnteproyectoCrear;
