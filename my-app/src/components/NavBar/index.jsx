import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/juntarmesasrelatorio">Mesas</Link>
        </li>
        <li>
          <Link to="/CadastroGarcons">Garçons</Link>
        </li>
        <li>
          <Link to="/Estoque">Estoque</Link>
        </li>
        <li>
          <Link to="/RelatorioMensal">Relatorio</Link>
        </li>
        <li>
          <Link to="/NotasFiscais">C/ Fiscais</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
