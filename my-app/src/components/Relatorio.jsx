import React from 'react';

const Relatorio = ({ mesas }) => {
  if (!mesas || !Array.isArray(mesas)) {
    return <div>Carregando...</div>;
  }

  // Cria um mapa para mesas juntas
  const mesasJuntasMap = mesas.reduce((acc, mesa) => {
    if (mesa.mesasJuntas) {
      const chave = [mesa.id, ...mesa.mesasJuntas].sort((a, b) => a - b).join('-');
      if (!acc[chave]) {
        acc[chave] = { id: chave, mesas: [mesa] };
      } else {
        acc[chave].mesas.push(mesa);
      }
    }
    return acc;
  }, {});

  const mesasJuntas = Object.values(mesasJuntasMap);

  // Filtra apenas as mesas que não estão juntas com outras
  const mesasIndividuais = mesas.filter(mesa => !mesa.mesasJuntas);

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
      {mesasJuntas.map(grupo => (
        <div key={grupo.id} className="relatorio-mesa">
          <h3>Mesas {grupo.id.split('-').join(' e ')}</h3>
          {gerarRelatorio(grupo.mesas)}
        </div>
      ))}
    </div>
  );
};

export default Relatorio;
