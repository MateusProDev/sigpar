import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RelatorioGarcons.css';

Chart.register(...registerables);

const RelatorioGarcons = ({ notasFiscais }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [vendasDiarias, setVendasDiarias] = useState({});
  const [vendasMensais, setVendasMensais] = useState({});

  useEffect(() => {
    const calcularVendas = () => {
      const vendasDiariasData = {};
      const vendasMensaisData = {};

      notasFiscais.forEach(nota => {
        if (nota.garcon) {
          const dataNota = new Date(nota.data);
          const diaNota = `${dataNota.getDate()}/${dataNota.getMonth() + 1}/${dataNota.getFullYear()}`;
          const mesNota = `${dataNota.getMonth() + 1}/${dataNota.getFullYear()}`;

          // Calcula vendas diárias
          if (!vendasDiariasData[diaNota]) {
            vendasDiariasData[diaNota] = {};
          }
          if (!vendasDiariasData[diaNota][nota.garcon]) {
            vendasDiariasData[diaNota][nota.garcon] = 0;
          }
          vendasDiariasData[diaNota][nota.garcon] += nota.total;

          // Calcula vendas mensais
          if (!vendasMensaisData[mesNota]) {
            vendasMensaisData[mesNota] = {};
          }
          if (!vendasMensaisData[mesNota][nota.garcon]) {
            vendasMensaisData[mesNota][nota.garcon] = 0;
          }
          vendasMensaisData[mesNota][nota.garcon] += nota.total;
        }
      });

      setVendasDiarias(vendasDiariasData);
      setVendasMensais(vendasMensaisData);
    };

    calcularVendas();
  }, [notasFiscais]);

  const getDailyData = () => {
    const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
    const dailyData = vendasDiarias[formattedDate] || {};

    return {
      labels: Object.keys(dailyData),
      datasets: [
        {
          label: 'Vendas Diárias',
          data: Object.values(dailyData),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getMonthlyData = () => {
    const formattedMonth = `${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
    const monthlyData = vendasMensais[formattedMonth] || {};

    return {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: 'Vendas Mensais',
          data: Object.values(monthlyData),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="relatorio-garcons-container">
      <h1>Relatório de Vendas por Garçom</h1>

      {/* Componente de Calendário */}
      <div className="calendar-container">
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      {/* Gráfico de Vendas Diárias */}
      <div className="vendas-diarias">
        <h2>Vendas Diárias - {`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}</h2>
        <Bar data={getDailyData()} />
      </div>

      {/* Gráfico de Vendas Mensais */}
      <div className="vendas-mensais">
        <h2>Vendas Mensais - {`${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}</h2>
        <Bar data={getMonthlyData()} />
      </div>
    </div>
  );
};

export default RelatorioGarcons;
