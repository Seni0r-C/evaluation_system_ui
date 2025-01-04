import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { MessageProvider } from './context/MessageContext';
import GlobalMessageDialog from './components/GlobalMessageDialog';
import router from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <UserProvider>      
          <RouterProvider router={router} />
          <GlobalMessageDialog />
        </UserProvider>
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>
);

