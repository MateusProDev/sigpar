import React, { useState, useEffect } from 'react';
import cardapio from './data/cardapio.json';
import '../index.css';

const Mesa = ({ mesa, adicionarPedido, removerPedido, fecharMesa }) => {
  const [novoPedido, setNovoPedido] = useState('');
  const [valorPedido, setValorPedido] = useState('');
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [showNotaFiscal, setShowNotaFiscal] = useState(false);

  useEffect(() => {
    if (novoPedido.trim()) {
      const filtrados = cardapio.filter(produto => 
        produto.nome.toLowerCase().includes(novoPedido.toLowerCase())
      );
      setProdutosFiltrados(filtrados);
    } else {
      setProdutosFiltrados([]);
    }
  }, [novoPedido]);

  const handleAddPedido = () => {
    if (novoPedido.trim() && valorPedido) {
      adicionarPedido(mesa.id, { nome: novoPedido.trim(), valor: parseFloat(valorPedido) });
      setNovoPedido('');
      setValorPedido('');
      setProdutosFiltrados([]);
    } else {
      alert('Por favor, preencha o nome do pedido e o valor.');
    }
  };

  const handleRemoverPedido = (pedidoIndex) => {
    removerPedido(mesa.id, pedidoIndex);
  };

  const handleFecharMesa = () => {
    if (window.confirm('Você tem certeza que deseja fechar a mesa?')) {
      fecharMesa(mesa.id);
      setShowNotaFiscal(true);
    }
  };

  const handlePrintNotaFiscal = () => {
    const printContents = document.getElementById(`nota-fiscal-${mesa.id}`).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleProdutoSelecionado = (produto) => {
    setNovoPedido(produto.nome);
    setValorPedido(produto.valor.toFixed(2));
    setProdutosFiltrados([]);
  };

  const calcularTotalMesa = () => {
    return mesa.pedidos.reduce((acc, pedido) => acc + pedido.valor, 0).toFixed(2);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
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
      <div className="total-mesa">
        <strong>Total da Mesa:</strong> R${calcularTotalMesa()}
      </div>
      <div className="adicionar-pedido-container">
        <input
          type="text"
          placeholder="Pedido"
          value={novoPedido}
          onChange={(e) => setNovoPedido(e.target.value)}
        />
        {produtosFiltrados.length > 0 && (
          <ul className="lista-sugestoes">
            {produtosFiltrados.map((produto, index) => (
              <li key={index} onClick={() => handleProdutoSelecionado(produto)}>
                {produto.nome} - R${produto.valor.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <input
          type="number"
          placeholder="Valor"
          value={valorPedido}
          onChange={(e) => setValorPedido(e.target.value)}
        />
        <button onClick={handleAddPedido}>Adicionar Pedido</button>
      </div>
      <button className="fechar-mesa" onClick={handleFecharMesa}>Fechar Mesa</button>

      {showNotaFiscal && (
        <div id={`nota-fiscal-${mesa.id}`} className="nota-fiscal">
          <h2>Nota Fiscal</h2>
          <p>Mesa {mesa.id}</p>
          <ul>
            {mesa.pedidos.map((pedido, index) => (
              <li key={index}>
                {pedido.nome} - R${pedido.valor.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="total-mesa">
            <strong>Total da Mesa:</strong> R${calcularTotalMesa()}
          </div>
          <p>Data: {getCurrentDateTime()}</p>
          <button onClick={handlePrintNotaFiscal}>Imprimir Nota Fiscal</button>
        </div>
      )}
    </div>
  );
};

export default Mesa;
