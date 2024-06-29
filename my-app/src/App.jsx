import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import JuntarMesasRelatorio from './components/JuntarMesasRelatorio';
import RelatorioMensal from './components/RelatorioMensal';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="mainConteudo">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juntarmesasrelatorio" element={<JuntarMesasRelatorio />} />
          <Route path="/relatoriomensal" element={<RelatorioMensal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
