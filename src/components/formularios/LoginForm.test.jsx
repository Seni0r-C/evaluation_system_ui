import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  test('renders LoginForm component', () => {
    const mockSetUsuario = vi.fn();
    const mockSetPassword = vi.fn();
    const mockToggleShowPassword = vi.fn();
    const mockHandleSubmit = vi.fn();

    render(
      <LoginForm
        usuario=""
        setUsuario={mockSetUsuario}
        password=""
        setPassword={mockSetPassword}
        showPassword={false}
        toggleShowPassword={mockToggleShowPassword}
        handleSubmit={mockHandleSubmit}
      />
    );

    // Verificar que los campos de entrada y el botón están presentes
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('calls setUsuario and setPassword on input change', async () => {
    const mockSetUsuario = vi.fn();
    const mockSetPassword = vi.fn();

    render(
      <LoginForm
        usuario=""
        setUsuario={mockSetUsuario}
        password=""
        setPassword={mockSetPassword}
        showPassword={false}
        toggleShowPassword={() => { }}
        handleSubmit={() => { }}
      />
    );

    const userInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await userEvent.type(userInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');

    expect(mockSetUsuario).toHaveBeenCalled();
    expect(mockSetPassword).toHaveBeenCalled();
  });

  test('calls handleSubmit on form submission', async () => {
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <LoginForm
        usuario="admin"
        setUsuario={() => { }}
        password="123"
        setPassword={() => { }}
        showPassword={false}
        toggleShowPassword={() => { }}
        handleSubmit={mockHandleSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await userEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});