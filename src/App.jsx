import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/calificaciones" element={<Calificaciones />} />
          <Route path="/resultados" element={<Resultados />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
