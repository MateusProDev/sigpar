import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar escalas e elementos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ContainerStyled = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const RelatorioMensal = () => {
  const [historicoPedidos, setHistoricoPedidos] = useState(() => {
    const savedHistorico = localStorage.getItem('historicoPedidos');
    return savedHistorico ? JSON.parse(savedHistorico) : [];
  });

  const [dadosDoMes, setDadosDoMes] = useState([]);

  useEffect(() => {
    localStorage.setItem('historicoPedidos', JSON.stringify(historicoPedidos));
  }, [historicoPedidos]);

  useEffect(() => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const initialData = Array.from({ length: lastDayOfMonth }, (_, index) => ({ dia: index + 1, valor: 0 }));

    const updatedData = initialData.map((dia) => {
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
  }, [historicoPedidos]);

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

  const dataPedidosMaisFrequentes = {
    labels: relatorioData.map(pedido => pedido.nome),
    datasets: [
      {
        label: 'Quantidade',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: relatorioData.map(pedido => pedido.quantidade),
      },
      {
        label: 'Valor Total',
        backgroundColor: 'rgba(153,102,255,1)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.4)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: relatorioData.map(pedido => pedido.valorTotal),
      },
    ],
  };

  const dataVendasDiarias = {
    labels: dadosDoMes.map(dia => dia.dia),
    datasets: [
      {
        label: 'Valor',
        backgroundColor: 'rgba(255,159,64,1)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,159,64,0.4)',
        hoverBorderColor: 'rgba(255,159,64,1)',
        data: dadosDoMes.map(dia => dia.valor),
      },
    ],
  };

  return (
    <ContainerStyled>
      <Typography variant="h4" gutterBottom>
        Relatório Mensal de Pedidos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Este relatório fornece uma visão abrangente das vendas realizadas durante o mês, destacando os pedidos mais frequentes e os valores totais arrecadados.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <PaperStyled>
            <Typography variant="h6">Estatísticas Gerais</Typography>
            <Typography variant="body1"><strong>Total de Pedidos:</strong> {historicoPedidos.length}</Typography>
            <Typography variant="body1"><strong>Valor Total Arrecadado:</strong> R${totalGeral.toFixed(2)}</Typography>
          </PaperStyled>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PaperStyled>
            <Typography variant="h6">Ações</Typography>
            <ButtonStyled variant="contained" color="primary" onClick={handlePrint}>Imprimir Relatório</ButtonStyled>
            <ButtonStyled variant="contained" color="secondary" onClick={handleReset}>Resetar Dados</ButtonStyled>
          </PaperStyled>
        </Grid>
        <Grid item xs={12}>
          <PaperStyled>
            <Typography variant="h6">Pedidos Mais Frequentes</Typography>
            <Typography variant="body2">O gráfico abaixo exibe os cinco pedidos mais frequentes realizados neste mês, juntamente com a quantidade total de vezes que cada um foi solicitado e o valor total arrecadado para cada pedido.</Typography>
            <Bar data={dataPedidosMaisFrequentes} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </PaperStyled>
        </Grid>
        <Grid item xs={12}>
          <PaperStyled>
            <Typography variant="h6">Vendas Diárias</Typography>
            <Typography variant="body2">O gráfico abaixo mostra o valor acumulado das vendas para cada dia do mês, permitindo uma visualização clara de como as vendas estão distribuídas ao longo do tempo.</Typography>
            <Bar data={dataVendasDiarias} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </PaperStyled>
        </Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default RelatorioMensal;
