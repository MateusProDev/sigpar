import React, { useState, useEffect } from 'react';
import './CadastroGarcons.css';
import RelatorioGarcons from '../RelatorioGarcons';

const CadastroGarcons = () => {
  const [garcons, setGarcons] = useState(() => {
    const savedGarcons = localStorage.getItem('garcons');
    return savedGarcons ? JSON.parse(savedGarcons) : [];
  });
  const [novoGarcon, setNovoGarcon] = useState('');
  const [notasFiscais, setNotasFiscais] = useState(() => {
    const savedNotasFiscais = localStorage.getItem('notasFiscais');
    return savedNotasFiscais ? JSON.parse(savedNotasFiscais) : [];
  });

  useEffect(() => {
    localStorage.setItem('garcons', JSON.stringify(garcons));
  }, [garcons]);

  const handleAddGarcon = () => {
    if (novoGarcon.trim()) {
      setGarcons([...garcons, { id: Date.now(), nome: novoGarcon.trim() }]);
      setNovoGarcon('');
    } else {
      alert('Por favor, insira o nome do garçom.');
    }
  };

  const handleRemoveGarcon = (id) => {
    setGarcons(garcons.filter(garcon => garcon.id !== id));
  };

  return (
    <div className="cadastro-garcons-container">
      <div className="box-garcons">
        <h1>Cadastro de Garçons</h1>
        <div className="cadastro-garcons-form">
          <input
            type="text"
            value={novoGarcon}
            onChange={(e) => setNovoGarcon(e.target.value)}
            placeholder="Nome do Garçom"
          />
          <button onClick={handleAddGarcon}>Adicionar Garçom</button>
        </div>
        <ul className="garcons-list">
          {garcons.map(garcon => (
            <li key={garcon.id}>
              {garcon.nome}
              <button onClick={() => handleRemoveGarcon(garcon.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="box-garcons">
        <RelatorioGarcons notasFiscais={notasFiscais} />
      </div>
    </div>
  );
};

export default CadastroGarcons;
