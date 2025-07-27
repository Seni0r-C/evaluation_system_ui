import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import React from 'react';

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

  test('simulates full login flow with state updates', async () => {
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());

    // Create a wrapper component to manage state for LoginForm
    const TestLoginFormWrapper = () => {
      const [usuario, setUsuario] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [showPassword, setShowPassword] = React.useState(false);

      const toggleShowPassword = () => setShowPassword(!showPassword);

      return (
        <LoginForm
          usuario={usuario}
          setUsuario={setUsuario}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          handleSubmit={mockHandleSubmit}
        />
      );
    };

    render(<TestLoginFormWrapper />);

    const userInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await userEvent.type(userInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // Verify that handleSubmit was called.
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    // If handleSubmit was expected to receive the form data, you would assert that here.
    // For example, if handleSubmit received an event object and extracted data from it,
    // you might need to inspect the mock call arguments more deeply.
    // Since LoginForm passes the event to handleSubmit, we can't directly check username/password here
    // unless LoginForm itself passes them as arguments to handleSubmit.
    // The primary goal here is to ensure the form submission is triggered.
  });
});
