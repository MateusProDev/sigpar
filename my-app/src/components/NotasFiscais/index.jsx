import React, { useState, useEffect, useRef } from 'react';
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './NotasFiscais.css';

// Registre os componentes necessários do Chart.js
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NotasFiscais = () => {
  const [notasFiscais, setNotasFiscais] = useState(() => {
    const savedNotas = localStorage.getItem('notasFiscais');
    return savedNotas ? JSON.parse(savedNotas) : [];
  });

  const [dataPesquisa, setDataPesquisa] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  const chartRef = useRef(null);

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

  const contarNotasPorMes = () => {
    const contagem = new Array(12).fill(0);
    notasFiscais.forEach(nota => {
      const mes = new Date(nota.data).getMonth();
      contagem[mes]++;
    });
    return contagem;
  };

  const dadosGrafico = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Notas Fiscais Emitidas',
        data: contarNotasPorMes(),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
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
      <div className="grafico-container">
        <h2>Notas Fiscais Emitidas por Mês</h2>
        <Line ref={chartRef} data={dadosGrafico} />
      </div>
    </div>
  );
};

export default NotasFiscais;
