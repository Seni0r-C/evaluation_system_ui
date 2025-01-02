import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import router from './routes/routes';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

