import React, { useState, useEffect } from 'react';
import './NotasFiscais.css';

const NotasFiscais = () => {
  const [notasFiscais, setNotasFiscais] = useState(() => {
    const savedNotas = localStorage.getItem('notasFiscais');
    return savedNotas ? JSON.parse(savedNotas) : [];
  });

  const [dataPesquisa, setDataPesquisa] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

  useEffect(() => {
    localStorage.setItem('notasFiscais', JSON.stringify(notasFiscais));
  }, [notasFiscais]);

  const handlePesquisar = () => {
    if (dataPesquisa.trim()) {
      const resultados = notasFiscais.filter(nota =>
        nota.data.includes(dataPesquisa)
      );
      setResultadosPesquisa(resultados);
    } else {
      alert('Por favor, insira uma data para a pesquisa.');
    }
  };

  const handleResetPesquisa = () => {
    setDataPesquisa('');
    setResultadosPesquisa([]);
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString() + ' ' + data.toLocaleTimeString();
  };

  return (
    <div className="notas-fiscais-container">
      <h1>Gerenciamento de Notas Fiscais</h1>
      <div className="pesquisa-container">
        <input
          type="date"
          value={dataPesquisa}
          onChange={(e) => setDataPesquisa(e.target.value)}
          className="input-pesquisa"
        />
        <button onClick={handlePesquisar} className="btn-pesquisar">Pesquisar</button>
        <button onClick={handleResetPesquisa} className="btn-resetar">Resetar Pesquisa</button>
      </div>
      <div className="resultados-pesquisa">
        {resultadosPesquisa.length > 0 ? (
          resultadosPesquisa.map((nota, index) => (
            <div key={index} className="nota-fiscal">
              <h2>Nota Fiscal</h2>
              <p>Mesa {nota.mesaId}</p>
              <ul>
                {nota.pedidos.map((pedido, index) => (
                  <li key={index}>
                    {pedido.nome} - R${pedido.valor.toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="total-mesa">
                <strong>Total da Mesa:</strong> R${nota.total.toFixed(2)}
              </div>
              <p>Data: {formatarData(nota.data)}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma nota fiscal encontrada para a data pesquisada.</p>
        )}
      </div>
    </div>
  );
};

export default NotasFiscais;
