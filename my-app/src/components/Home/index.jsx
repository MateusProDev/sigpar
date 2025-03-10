import React from 'react';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <div>
      <div className="header">
        <img src='./img/Restaurant.png' alt="Logo do Sistema" className="logo" />
        <h2>Sistema de Gerenciamento para restaurantes</h2>
      </div>
      <div className="content">
        <h2>Página Inicial</h2>
        <p>Bem-vindo ao SIGPAR, Sistema de Gerenciamento para restaurantes!</p>
      </div>
    </div>
  </div>
);

export default Home;
