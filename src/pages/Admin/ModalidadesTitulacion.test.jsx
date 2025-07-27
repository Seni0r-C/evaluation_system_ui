import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Modalidades from './ModalidadesTitulacion';
import axiosInstance from '../../services/axiosConfig';
import { useMessage } from '../../hooks/useMessage';

// Mock axiosInstance
vi.mock('../../services/axiosConfig', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock useMessage
const mockShowMsg = vi.fn();
const mockShowQuestion = vi.fn(async (message, callback) => {
  await callback();
});

vi.mock('../../hooks/useMessage', () => ({
  useMessage: vi.fn(() => ({
    showMsg: mockShowMsg,
    showQuestion: mockShowQuestion,
  })),
}));

describe('ModalidadesTitulacion', () => {
  beforeEach(() => {
    // Reset mocks before each test
    axiosInstance.get.mockReset();
    axiosInstance.post.mockReset();
    axiosInstance.put.mockReset();
    axiosInstance.delete.mockReset();
    mockShowMsg.mockReset(); // Reset the global mock
    mockShowQuestion.mockReset(); // Reset the global mock
  });

  test('renders ModalidadesTitulacion component', async () => {
    // Mock initial get requests for this specific test
    axiosInstance.get.mockResolvedValueOnce({ data: [] }); // For initial fetchModalidades
    axiosInstance.get.mockResolvedValueOnce({ data: { datos: [] } }); // For initial fetchCarreras

    render(<Modalidades />);

    // Get all buttons with the name "Crear Modalidad"
    const createModalityButtons = screen.getAllByRole('button', { name: /crear modalidad/i });
    expect(createModalityButtons).toHaveLength(2); // Expecting two buttons

    // Find the tab button (the one without type="submit")
    const createModalidadTabButton = createModalityButtons.find(button => !button.hasAttribute('type'));
    expect(createModalidadTabButton).toBeInTheDocument();

    // Find the submit button (the one with type="submit")
    const createModalidadSubmitButton = createModalityButtons.find(button => button.getAttribute('type') === 'submit');
    expect(createModalidadSubmitButton).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /modalidades/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /asociaciones/i })).toBeInTheDocument();

    // Check if the form for creating modality is visible by default
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/máximo de participantes/i)).toBeInTheDocument();
    expect(createModalidadSubmitButton).toBeInTheDocument(); // Use the already found submit button
  });

  test('allows creating a new modality', async () => {
    const { showMsg } = useMessage();

    // Mock initial get requests for this specific test
    axiosInstance.get.mockResolvedValueOnce({ data: [] }); // For initial fetchModalidades
    axiosInstance.get.mockResolvedValueOnce({ data: { datos: [] } }); // For initial fetchCarreras

    // Mock the post request to simulate successful creation
    axiosInstance.post.mockResolvedValueOnce({ data: {} });

    // Mock the subsequent get request after creation to show the new modality in the list
    axiosInstance.get.mockResolvedValueOnce({ data: [{ id: 1, nombre: 'Nueva Modalidad', max_participantes: 10 }] }); // For fetchModalidades after creation

    render(<Modalidades />);

    // Fill the form
    await userEvent.type(screen.getByLabelText(/nombre/i), 'Nueva Modalidad');
    await userEvent.type(screen.getByLabelText(/máximo de participantes/i), '10');

    // Submit the form
    await userEvent.click(screen.getByText('Crear Modalidad', { selector: 'button[type="submit"]', exact: true }));

    // Wait for the API call to be made
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/modalidad-titulacion/crear',
        { nombre: 'Nueva Modalidad', max_participantes: '10' }
      );
    });

    // Verify success message
    await waitFor(() => {
      expect(showMsg).toHaveBeenCalledWith({
        typeMsg: 'success',
        message: 'Modalidad creada exitosamente',
      });
    });

    // Verify that the tab changes to "Modalidades" and the new modality is listed
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /modalidades/i })).toHaveClass('border-blue-600');
      expect(screen.getByText('Nueva Modalidad')).toBeInTheDocument();
      expect(screen.getByText('Máximo: 10')).toBeInTheDocument();
    });
  });
});
