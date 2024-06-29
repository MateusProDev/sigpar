import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RelatorioMensal = () => {
  const [historicoPedidos, setHistoricoPedidos] = useState(() => {
    const savedHistorico = localStorage.getItem('historicoPedidos');
    return savedHistorico ? JSON.parse(savedHistorico) : [];
  });

  useEffect(() => {
    localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos));
  }, [historicoPedidos]);

  const calcularTotalPedidos = () => {
    let totalPedidos = 0;
    let totalValor = 0;

    historicoPedidos.forEach(pedido => {
      totalPedidos++;
      totalValor += pedido.valor;
    });

    return { totalPedidos, totalValor };
  };

  const gerarRelatorio = () => {
    const relatorioPedidos = historicoPedidos.reduce((acc, pedido) => {
      acc[pedido.nome] = acc[pedido.nome] || { count: 0, valor: 0 };
      acc[pedido.nome].count += 1;
      acc[pedido.nome].valor += pedido.valor;
      return acc;
    }, {});

    const pedidosMaisFrequentes = Object.entries(relatorioPedidos)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);

    return pedidosMaisFrequentes.map(([pedido, data]) => ({
      nome: pedido,
      quantidade: data.count,
      valorTotal: data.valor,
    }));
  };

  const relatorioData = gerarRelatorio();
  const totalGeral = calcularTotalPedidos().totalValor;

  return (
    <div className="relatorio-mensal-container">
      <h2>Relatório Mensal de Pedidos</h2>
      <p>Total Geral: R${totalGeral.toFixed(2)}</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={relatorioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantidade" fill="#8884d8" />
          <Bar dataKey="valorTotal" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RelatorioMensal;
