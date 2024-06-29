import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import JuntarMesasRelatorio from './components/JuntarMesasRelatorio';
import RelatorioMesas from './components/RelatorioMesas';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="mainConteudo">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juntarmesasrelatorio" element={<JuntarMesasRelatorio />} />
          <Route path="/relatoriomesas" element={<RelatorioMesas />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
