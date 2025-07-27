
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { expect, test, vi } from 'vitest';

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
