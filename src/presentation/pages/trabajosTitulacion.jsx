import{ useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const CrearTrabajo = () => {
  const [carreras, setCarreras] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [cotutores, setCotutores] = useState([]);

  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [selectedCotutor, setSelectedCotutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [linkArchivo, setLinkArchivo] = useState('');

  const [tutorSearch, setTutorSearch] = useState('');
  const [cotutorSearch, setCotutorSearch] = useState('');

  // Fetch carreras
  useEffect(() => {
    axios.get(API_URL+'/carrera/listar')
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
  const buscarUsuarios = (query, setResults) => {
    axios.get(`${API_URL}/usuarios`, { params: { nombre: query } })
      .then(response => setResults(response.data))
      .catch(error => console.error('Error al buscar usuarios:', error));
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

    axios.post(API_URL+'/trabajo-titulacion/crear', trabajoData)
      .then(response => {
        alert('Trabajo creado con éxito: ' + response.data.datos.id);
      })
      .catch(error => console.error('Error al crear trabajo:', error));
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

      {/* Búsqueda de tutor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Tutor</label>
        <input
          type="text"
          value={tutorSearch}
          onChange={(e) => {
            setTutorSearch(e.target.value);
            buscarUsuarios(e.target.value, setTutores);
          }}
          placeholder="Ingrese el nombre del tutor"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <select
          value={selectedTutor}
          onChange={(e) => setSelectedTutor(e.target.value)}
          className="w-full border rounded px-3 py-2">
          <option value="">Seleccione un tutor</option>
          {tutores.map(tutor => (
            <option key={tutor.id} value={tutor.id}>{tutor.nombre} {tutor.apellido}</option>
          ))}
        </select>
      </div>

      {/* Búsqueda de cotutor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Cotutor</label>
        <input
          type="text"
          value={cotutorSearch}
          onChange={(e) => {
            setCotutorSearch(e.target.value);
            buscarUsuarios(e.target.value, setCotutores);
          }}
          placeholder="Ingrese el nombre del cotutor"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <select
          value={selectedCotutor}
          onChange={(e) => setSelectedCotutor(e.target.value)}
          className="w-full border rounded px-3 py-2">
          <option value="">Seleccione un cotutor</option>
          {cotutores.map(cotutor => (
            <option key={cotutor.id} value={cotutor.id}>{cotutor.nombre} {cotutor.apellido}</option>
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
