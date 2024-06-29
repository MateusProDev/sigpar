import React from 'react';

const RelatorioMesas = ({ mesas }) => {
  // Verifica se há mesas e se é um array
  if (!mesas || !Array.isArray(mesas) || mesas.length === 0) {
    return <div>Nenhuma mesa encontrada.</div>;
  }

  // Função para calcular o total de pedidos e seus valores
  const calcularTotalPedidos = () => {
    let totalPedidos = 0;
    let totalValor = 0;

    mesas.forEach(mesa => {
      mesa.pedidos.forEach(pedido => {
        totalPedidos++;
        totalValor += pedido.valor;
      });
    });

    return { totalPedidos, totalValor };
  };

  // Função para gerar o relatório de pedidos por mesa
  const gerarRelatorio = () => {
    return (
      <div className="relatorio-container">
        <h2>Relatório de Pedidos por Mesa</h2>
        {mesas.map(mesa => (
          <div key={mesa.id} className="relatorio-mesa">
            <h3>Mesa {mesa.id}</h3>
            <ul>
              {mesa.pedidos.map((pedido, index) => (
                <li key={index}>
                  {pedido.nome} - R${pedido.valor.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="total-geral">
          <p>Total de Pedidos: {calcularTotalPedidos().totalPedidos}</p>
          <p>Total Geral: R${calcularTotalPedidos().totalValor.toFixed(2)}</p>
        </div>
      </div>
    );
  };

  return gerarRelatorio();
};

export default RelatorioMesas;
