import { useEffect, useState } from 'react';
import BuscadorYSelectorDeUsuarios from '../components/BuscadorYSelectorDeUsuarios';
import { buscarUsuarios } from '../services/usuarioService';
import { obtenerCarreras } from '../services/carreraService';
import { obtenerModalidadesPorCarrera } from '../services/modalidadService';
import axiosInstance from '../services/axiosConfig';

const TrabajoTitulacionCrear = () => {
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [cotutores, setCotutores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedCotutor, setSelectedCotutor] = useState(null);
  const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [linkArchivo, setLinkArchivo] = useState('');

  const [tutorSearch, setTutorSearch] = useState('');
  const [cotutorSearch, setCotutorSearch] = useState('');
  const [estudianteSearch, setEstudianteSearch] = useState('');

  const [highlightedIndexTutor, setHighlightedIndexTutor] = useState(-1);
  const [highlightedIndexCotutor, setHighlightedIndexCotutor] = useState(-1);
  const [highlightedIndexEstudiante, setHighlightedIndexEstudiante] = useState(-1);

  const resetForm = () => {
    setCarreras([]);
    setModalidades([]);
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

  useEffect(() => {
    obtenerCarreras(setCarreras);
  }, []);

  useEffect(() => {
    if (selectedCarrera) {
      obtenerModalidadesPorCarrera(selectedCarrera, setModalidades);
    }
  }, [selectedCarrera]);

  // Fetch usuarios
  const buscarUsuariosConRol = (query, setResults, rol) => {
    buscarUsuarios(query, setResults, rol);
  };

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
      console.log("hi");
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

        alert('Trabajo creado con éxito: ' + trabajoId);
      } catch (error) {
        alert('Error al agregar estudiantes: ' + error.response?.data?.error || error);
        console.error('Error al agregar estudiantes:', error.response?.data?.error || error);
      }

    } catch (error) {
      alert('Error al crear trabajo: ' + error.response?.data?.error || error);
      console.error('Error al crear trabajo:', error.response?.data?.error || error);
    } finally {
      resetForm();
    }
  };

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


  const handleChipRemove = (type, user) => {
    if (type === 'tutor') {
      setSelectedTutor(null);
    } else if (type === 'cotutor') {
      setSelectedCotutor(null);
    } else if (type === 'estudiante') {
      setSelectedEstudiantes((prevSelectedEstudiantes) => prevSelectedEstudiantes.filter((est) => est.id !== user.id));
    }
  };

  const handleEstudianteSelect = (user) => {
    try {
      const modalidad = modalidades.find((mod) => mod.id === parseInt(selectedModalidad));
      if (selectedEstudiantes.length >= parseInt(modalidad.max_participantes)) {
        alert('No puedes agregar más estudiantes a este trabajo');
        return;
      }
      setSelectedEstudiantes((prevSelectedEstudiantes) => {
        if (prevSelectedEstudiantes.find(est => est.id === user.id)) {
          alert('Este estudiante ya está seleccionado');
          return prevSelectedEstudiantes;
        }
        return [...prevSelectedEstudiantes, user];
      });
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear Trabajo de Titulación</h1>

      {/* Contenedor de dos columnas */}
      <form action="" onSubmit={(e) => handleCrearTrabajo(e)}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 */}
          <div>
            {/* Seleccionar carrera */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
              <select
                value={selectedCarrera}
                onChange={(e) => setSelectedCarrera(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Seleccione una carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                ))}
              </select>
            </div>

            {/* Seleccionar modalidad */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
              <select
                value={selectedModalidad}
                onChange={(e) => setSelectedModalidad(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Seleccione una modalidad</option>
                {modalidades.map(modalidad => (
                  <option key={modalidad.id} value={modalidad.id}>{modalidad.nombre}</option>
                ))}
              </select>
            </div>

            {/* Título */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ingrese el título del trabajo"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Link del archivo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Link del Archivo</label>
              <input
                type="text"
                value={linkArchivo}
                onChange={(e) => setLinkArchivo(e.target.value)}
                placeholder="Ingrese el link del archivo"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Columna 2 */}
          <div >
            {/* Buscar Tutor */}
            <BuscadorYSelectorDeUsuarios
              label="Buscar Tutor"
              placeholder="Ingrese el nombre del tutor"
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
            />

            {/* Buscar Cotutor */}
            <BuscadorYSelectorDeUsuarios
              label="Buscar Co-tutor"
              optional={true}
              placeholder="Ingrese el nombre del cotutor"
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
              required={true}
            />

            {/* Buscar Estudiantes */}
            <BuscadorYSelectorDeUsuarios
              label="Buscar Estudiante"
              placeholder="Ingrese el nombre del estudiante"
              searchValue={estudianteSearch}
              setSearchValue={setEstudianteSearch}
              searchResults={estudiantes}
              setSearchResults={setEstudiantes}
              selectedUser={null} // No hay uno solo seleccionado
              selectedUSers={selectedEstudiantes}
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

  );
};

export default TrabajoTitulacionCrear;
