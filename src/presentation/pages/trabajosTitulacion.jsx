import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import BuscarUsuario from '../components/BuscarTutor';

const CrearTrabajo = () => {
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [cotutores, setCotutores] = useState([]);
  const [isLoadingTutores, setIsLoadingTutores] = useState(false);
  const [isLoadingCotutores, setIsLoadingCotutores] = useState(false);

  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [selectedCotutor, setSelectedCotutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [linkArchivo, setLinkArchivo] = useState('');

  const [tutorSearch, setTutorSearch] = useState('');
  const [cotutorSearch, setCotutorSearch] = useState('');

  const [highlightedIndexTutor, setHighlightedIndexTutor] = useState(-1); // Índice resaltado para tutores
  const [highlightedIndexCotutor, setHighlightedIndexCotutor] = useState(-1); // Índice resaltado para cotutores

  // Fetch carreras
  useEffect(() => {
    axios.get(API_URL + '/carrera/listar')
      .then(response => setCarreras(response.data.datos))
      .catch(error => console.error('Error al cargar carreras:', error));

  }, []);

  // Fetch modalidades cuando cambia la carrera seleccionada
  useEffect(() => {
    if (selectedCarrera) {
      axios.get(`${API_URL}/modalidad-titulacion/listarPorCarrera/${selectedCarrera}`)
        .then(response => setModalidades(response.data))
        .catch(error => console.error('Error al cargar modalidades:', error));
    }
  }, [selectedCarrera]);

  // Fetch usuarios
  const buscarUsuarios = (query, setResults, setLoading) => {
    setLoading(true);
    axios.get(`${API_URL}/usuarios`, { params: { nombre: query, rol: 3 } })
      .then(response => setResults(response.data))
      .catch(error => console.error('Error al buscar usuarios:', error))
      .finally(() => setLoading(false));
  };

  const handleCrearTrabajo = () => {
    const trabajoData = {
      carrera_id: selectedCarrera,
      modalidad_id: selectedModalidad,
      tutor_id: selectedTutor,
      cotutor_id: selectedCotutor,
      titulo,
      link_archivo: linkArchivo,
    };

    axios.post(API_URL + '/trabajo-titulacion/crear', trabajoData)
      .then(response => {
        alert('Trabajo creado con éxito: ' + response.data.datos.id);
      })
      .catch(error => console.error('Error al crear trabajo:', error));
  };

  const handleKeyDown = (e, type) => {
    // Lógica para la navegación de las teclas de dirección y selección en función del tipo (tutor o cotutor)
    const setHighlightedIndex = type === 'tutor' ? setHighlightedIndexTutor : setHighlightedIndexCotutor;
    const highlightedIndex = type === 'tutor' ? highlightedIndexTutor : highlightedIndexCotutor;
    const results = type === 'tutor' ? tutores : cotutores;
    
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && highlightedIndexTutor >= 0) {
      e.preventDefault();
      const selected = results[highlightedIndex];
      if (type === 'tutor') {
        setSelectedTutor(selected);
      } else {
        setSelectedCotutor(selected);
      }
      setTutorSearch(""); // Limpiar búsqueda
      setHighlightedIndex(-1);
    }
  };

  const handleChipRemove = (type) => {
    if (type === 'tutor') {
      setSelectedTutor(null);
    } else {
      setSelectedCotutor(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear Trabajo de Titulación</h1>

      {/* Seleccionar carrera */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
        <select
          value={selectedCarrera}
          onChange={(e) => setSelectedCarrera(e.target.value)}
          className="w-full border rounded px-3 py-2">
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
          className="w-full border rounded px-3 py-2">
          <option value="">Seleccione una modalidad</option>
          {modalidades.map(modalidad => (
            <option key={modalidad.id} value={modalidad.id}>{modalidad.nombre}</option>
          ))}
        </select>
      </div>

 {/* Buscar Tutor */}
 <BuscarUsuario
        label="Buscar Tutor"
        placeholder="Ingrese el nombre del tutor"
        searchValue={tutorSearch}
        setSearchValue={setTutorSearch}
        searchResults={tutores}
        setSearchResults={setTutores}
        isLoading={isLoadingTutores}
        setIsLoading={setIsLoadingTutores}
        selectedUser={selectedTutor}
        setSelectedUser={setSelectedTutor}
        handleKeyDown={handleKeyDown}
        handleChipRemove={handleChipRemove}
        type="tutor"
        setHighlightedIndex={setHighlightedIndexTutor}
        highlightedIndex={highlightedIndexTutor}
        buscarUsuarios={buscarUsuarios}
      />

      {/* Buscar Cotutor */}
      <BuscarUsuario
        label="Buscar Cotutor"
        optional={true}
        placeholder="Ingrese el nombre del cotutor"
        searchValue={cotutorSearch}
        setSearchValue={setCotutorSearch}
        searchResults={cotutores}
        setSearchResults={setCotutores}
        isLoading={isLoadingCotutores}
        setIsLoading={setIsLoadingCotutores}
        selectedUser={selectedCotutor}
        setSelectedUser={setSelectedCotutor}
        handleKeyDown={handleKeyDown}
        handleChipRemove={handleChipRemove}
        type="cotutor"
        setHighlightedIndex={setHighlightedIndexCotutor}
        highlightedIndex={highlightedIndexCotutor}
        buscarUsuarios={buscarUsuarios}
      />

      {/* Título */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título del trabajo"
          className="w-full border rounded px-3 py-2"
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
        />
      </div>

      {/* Botón de creación */}
      <button
        onClick={handleCrearTrabajo}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Crear Trabajo
      </button>
    </div>
  );
};

export default CrearTrabajo;
