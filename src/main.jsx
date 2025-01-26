import React from 'react';
import './styles/index.css'
import router from './routes/routes';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { MessageProvider } from './context/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>
);