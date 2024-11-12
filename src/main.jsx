import './index.css'
import { RouterProvider } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './utils/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

