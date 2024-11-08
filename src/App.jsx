import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Hello Vite!</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
