import React from 'react';

const Relatorio = ({ mesas }) => {
  if (!mesas || !Array.isArray(mesas)) {
    return <div>Carregando...</div>;
  }

  // Filtra apenas as mesas que não estão juntas com outras
  const mesasIndividuais = mesas.filter(mesa => !mesa.mesasJuntas);
  // Filtra apenas as mesas que estão juntas com outras
  const mesasJuntas = mesas.filter(mesa => mesa.mesasJuntas);

  const gerarRelatorio = (mesas) => {
    const todosPedidos = mesas.flatMap(mesa => mesa.pedidos);
    const contadorPedidos = todosPedidos.reduce((acc, pedido) => {
      acc[pedido.nome] = acc[pedido.nome] || { count: 0, valor: 0 };
      acc[pedido.nome].count += 1;
      acc[pedido.nome].valor += pedido.valor;
      return acc;
    }, {});

    const pedidosMaisFrequentes = Object.entries(contadorPedidos).sort((a, b) => b[1].count - a[1].count);

    return (
      <ul>
        {pedidosMaisFrequentes.map(([pedido, data]) => (
          <li key={pedido}>
            {pedido}: {data.count} pedidos, Total: R${data.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    );
  };

  const totalGeral = mesas.reduce((acc, mesa) => {
    return acc + mesa.pedidos.reduce((accPedidos, pedido) => accPedidos + pedido.valor, 0);
  }, 0);

  return (
    <div className="relatorio-container">
      <h2>Pedidos Recentes</h2>
      <p>Total Geral: R${totalGeral.toFixed(2)}</p>

      {/* Renderiza o relatório para mesas individuais */}
      {mesasIndividuais.map(mesa => (
        <div key={mesa.id} className="relatorio-mesa">
          <h3>Mesa {mesa.id}</h3>
          {gerarRelatorio([mesa])}
        </div>
      ))}

      {/* Renderiza o relatório para mesas juntas */}
      {mesasJuntas.map(mesa => (
        <div key={mesa.id} className="relatorio-mesa">
          <h3>Mesas {mesa.id} e {mesa.mesasJuntas.join(' e ')}</h3>
          {gerarRelatorio([mesa, ...mesas.filter(m => mesa.mesasJuntas.includes(m.id))])}
        </div>
      ))}
    </div>
  );
};

export default Relatorio;
