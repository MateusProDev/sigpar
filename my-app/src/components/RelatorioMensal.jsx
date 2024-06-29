import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RelatorioMensal = () => {
  const [historicoPedidos, setHistoricoPedidos] = useState(() => {
    const savedHistorico = localStorage.getItem('historicoPedidos');
    return savedHistorico ? JSON.parse(savedHistorico) : [];
  });

  const [dadosDoMes, setDadosDoMes] = useState(() => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const initialData = Array.from({ length: lastDayOfMonth }, (_, index) => ({ dia: index + 1, valor: 0 }));
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos));
  }, [historicoPedidos]);

  useEffect(() => {
    const today = new Date();
    const updatedData = dadosDoMes.map((dia) => {
      const valorDia = historicoPedidos.reduce((acc, pedido) => {
        const dataPedido = new Date(pedido.data);
        if (dataPedido.getDate() === dia.dia && dataPedido.getMonth() === today.getMonth() && dataPedido.getFullYear() === today.getFullYear()) {
          acc += pedido.valor;
        }
        return acc;
      }, 0);
      return { ...dia, valor: valorDia };
    });
    setDadosDoMes(updatedData);
  }, [historicoPedidos, dadosDoMes]);

  const calcularTotalPedidos = () => {
    const totalPedidos = historicoPedidos.length;
    const totalValor = historicoPedidos.reduce((acc, pedido) => acc + pedido.valor, 0);
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

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Você tem certeza que deseja resetar o histórico de pedidos?')) {
      setHistoricoPedidos([]);
      localStorage.removeItem('historicoPedidos');
    }
  };

  const relatorioData = gerarRelatorio();
  const totalGeral = calcularTotalPedidos().totalValor;

  return (
    <div className="relatorio-mensal-container">
      <h2>Relatório Mensal de Pedidos</h2>
      <p>Este relatório fornece uma visão abrangente das vendas realizadas durante o mês, destacando os pedidos mais frequentes e os valores totais arrecadados.</p>
      
      <section className="stats-section">
        <h3>Estatísticas Gerais</h3>
        <p><strong>Total de Pedidos:</strong> {historicoPedidos.length}</p>
        <p><strong>Valor Total Arrecadado:</strong> R${totalGeral.toFixed(2)}</p>
      </section>

      <section className="chart-section">
        <h3>Pedidos Mais Frequentes</h3>
        <p>O gráfico abaixo exibe os cinco pedidos mais frequentes realizados neste mês, juntamente com a quantidade total de vezes que cada um foi solicitado e o valor total arrecadado para cada pedido.</p>
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
      </section>

      <section className="chart-section">
        <h3>Vendas Diárias</h3>
        <p>O gráfico abaixo mostra o valor acumulado das vendas para cada dia do mês, permitindo uma visualização clara de como as vendas estão distribuídas ao longo do tempo.</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dadosDoMes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <div className="buttons-container">
        <button onClick={handlePrint}>Imprimir Relatório</button>
        <button onClick={handleReset}>Resetar Dados</button>
      </div>
    </div>
  );
};

export default RelatorioMensal;
