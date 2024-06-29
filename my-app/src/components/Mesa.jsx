import React, { useState } from 'react';

const Mesa = ({ mesa, adicionarPedido, removerPedido }) => {
  const [novoPedido, setNovoPedido] = useState('');
  const [valorPedido, setValorPedido] = useState('');

  const handleAddPedido = () => {
    if (novoPedido.trim() && valorPedido) {
      adicionarPedido(mesa.id, { nome: novoPedido.trim(), valor: parseFloat(valorPedido) });
      setNovoPedido('');
      setValorPedido('');
    } else {
      alert('Por favor, preencha o nome do pedido e o valor.');
    }
  };

  const handleRemoverPedido = (pedidoIndex) => {
    removerPedido(mesa.id, pedidoIndex);
  };

  return (
    <div className="mesa">
      <h3>Mesa {mesa.id}</h3>
      <ul>
        {mesa.pedidos.map((pedido, index) => (
          <li key={index}>
            {pedido.nome} - R${pedido.valor.toFixed(2)}
            <button onClick={() => handleRemoverPedido(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <div className="adicionar-pedido-container">
        <input
          type="text"
          placeholder="Pedido"
          value={novoPedido}
          onChange={(e) => setNovoPedido(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valorPedido}
          onChange={(e) => setValorPedido(e.target.value)}
        />
        <button onClick={handleAddPedido}>Adicionar Pedido</button>
      </div>
    </div>
  );
};

export default Mesa;
