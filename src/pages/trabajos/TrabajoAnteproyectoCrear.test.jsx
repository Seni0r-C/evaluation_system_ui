import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TrabajoAnteproyectoCrear from './TrabajoAnteproyectoCrear';
import axiosInstance from '../../services/axiosConfig';
import * as usuarioService from '../../services/usuarioService';
import * as carreraService from '../../services/carreraService';
import * as modalidadService from '../../services/modalidadService';
import UserContext from '../../context/UserContext';

// Mock axiosInstance
vi.mock('../../services/axiosConfig', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// Mock services
vi.mock('../../services/usuarioService', () => ({
  buscarUsuarios: vi.fn(),
}));
vi.mock('../../services/carreraService', () => ({
  obtenerCarreras: vi.fn(),
}));
vi.mock('../../services/modalidadService', () => ({
  obtenerModalidadesPorCarrera: vi.fn(),
}));

// Mock MessageDialog (assuming it uses useState internally for isOpen, message, iconType)
// We will mock the internal state setters to control its behavior
vi.mock('../../components/shared/MessageDialog', () => ({
  __esModule: true,
  default: ({ message, isOpen, onClose }) => {
    // Simulate the dialog being open/closed and displaying content
    if (isOpen) {
      return (
        <div data-testid="message-dialog">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
    }
    return null;
  },
}));

// Mock UserContext
const mockUser = {
  id: 1,
  nombre: 'Test User',
  roles: [{ id: 1, nombre: 'Admin' }], // Not a tutor for this test
};

describe('TrabajoAnteproyectoCrear', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mocks for initial data fetching
    carreraService.obtenerCarreras.mockImplementation((setCarreras) => {
      setCarreras([{ id: 1, nombre: 'Ingeniería de Software' }]);
    });
    modalidadService.obtenerModalidadesPorCarrera.mockImplementation((carreraId, setModalidades) => {
      setModalidades([{ id: 101, nombre: 'Tesis', max_participantes: 1 }]);
    });
    usuarioService.buscarUsuarios.mockImplementation((query, setResults, rol) => {
      return new Promise(resolve => {
        if (rol === 3) { // Tutor
          resolve([{ id: 2, nombre: 'Dr. Tutor' }]);
        } else if (rol === 4) { // Estudiante
          resolve([{ id: 3, nombre: 'Estudiante A' }, { id: 4, nombre: 'Estudiante B' }]);
        } else {
          resolve([]);
        }
      }).then(results => setResults(results));
    });

    // Mock axios post calls
    axiosInstance.post.mockResolvedValue({ data: { id: 123 } }); // For creating thesis
  });

  test('renders form and allows creating a new thesis work', async () => {
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <TrabajoAnteproyectoCrear />
      </UserContext.Provider>
    );

    // 1. Select Carrera
    await userEvent.selectOptions(screen.getByLabelText(/carrera/i), '1');
    await waitFor(() => {
      expect(modalidadService.obtenerModalidadesPorCarrera).toHaveBeenCalledWith('1', expect.any(Function));
    });

    // 2. Select Modalidad
    await userEvent.selectOptions(screen.getByLabelText(/modalidad/i), '101');

    // 3. Enter Título
    await userEvent.type(screen.getByLabelText(/título/i), 'Mi Título de Tesis');

    // 4. Enter Link del Archivo
    await userEvent.type(screen.getByLabelText(/link del archivo/i), 'http://example.com/tesis.pdf');

    // 5. Select Tutor
    await userEvent.type(screen.getByLabelText(/buscar tutor/i), 'Dr. Tutor');
    await waitFor(() => {
      expect(usuarioService.buscarUsuarios).toHaveBeenCalledWith('Dr. Tutor', expect.any(Function), 3);
    });
    await userEvent.click(screen.getByText('Dr. Tutor')); // Click on the suggested tutor

    // 6. Select Estudiante
    await userEvent.type(screen.getByLabelText(/buscar estudiante/i), 'Estudiante A');
    await waitFor(() => {
      expect(usuarioService.buscarUsuarios).toHaveBeenCalledWith('Estudiante A', expect.any(Function), 4);
    });
    await userEvent.click(screen.getByText('Estudiante A')); // Click on the suggested student

    // 7. Submit the form
    await userEvent.click(screen.getByRole('button', { name: /crear trabajo/i }));

    // 8. Verify API calls
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/trabajo-titulacion/crear',
        {
          carrera_id: '1',
          modalidad_id: '101',
          tutor_id: 2,
          cotutor_id: null,
          titulo: 'Mi Título de Tesis',
          link_archivo: 'http://example.com/tesis.pdf',
        }
      );
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/trabajo-titulacion/asociarEstudiante',
        {
          trabajo_id: 123,
          estudiante_id: 3,
        }
      );
    });

    // 9. Verify success message
    await waitFor(() => {
      expect(screen.getByTestId('message-dialog')).toBeInTheDocument();
      expect(screen.getByText('Trabajo de titulación creado exitosamente')).toBeInTheDocument();
    });

    // 10. Verify form reset (check if fields are empty)
    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue('');
      expect(screen.getByLabelText(/link del archivo/i)).toHaveValue('');
      // Add more assertions for other fields if needed
    });
  });
});
