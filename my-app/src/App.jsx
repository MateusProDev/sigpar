import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import JuntarMesasRelatorio from './components/JuntarMesasRelatorio';
import RelatorioMensal from './components/RelatorioMensal';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Estoque from './components/Estoque';
import NotasFiscais from './components/NotasFiscais';
import CadastroGarcons from './components/CadastroGarcons';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="mainConteudo">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/juntarmesasrelatorio"
            element={
              <PrivateRoute>
                <JuntarMesasRelatorio />
              </PrivateRoute>
            }
          />
          <Route
            path="/relatoriomensal"
            element={
              <PrivateRoute>
                <RelatorioMensal />
              </PrivateRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <PrivateRoute>
                <Estoque />
              </PrivateRoute>
            }
          />
          <Route
            path="/notasfiscais"
            element={
              <PrivateRoute>
                <NotasFiscais />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastroGarcons"
            element={
              <PrivateRoute>
                <CadastroGarcons />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
