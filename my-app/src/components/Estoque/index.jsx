import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Estoque.css';

const Estoque = () => {
  const [estoque, setEstoque] = useState(() => {
    const savedEstoque = localStorage.getItem('estoque');
    return savedEstoque ? JSON.parse(savedEstoque) : [];
  });

  const [cardapio, setCardapio] = useState(() => {
    const savedCardapio = localStorage.getItem('cardapio');
    return savedCardapio ? JSON.parse(savedCardapio) : [];
  });

  const [novoProduto, setNovoProduto] = useState('');
  const [novoValorProduto, setNovoValorProduto] = useState('');
  const [novoItemEstoque, setNovoItemEstoque] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [novoValorEstoque, setNovoValorEstoque] = useState('');

  useEffect(() => {
    localStorage.setItem('estoque', JSON.stringify(estoque));
    verificarEstoque();
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem('cardapio', JSON.stringify(cardapio));
  }, [cardapio]);

  const verificarEstoque = () => {
    estoque.forEach(item => {
      if (item.quantidade < 3) {
        toast.warn(`A quantidade do item ${item.nome} está baixa!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const adicionarAoCardapio = () => {
    if (novoProduto.trim() && novoValorProduto.trim()) {
      const novoItem = {
        id: cardapio.length + 1,
        nome: novoProduto.trim(),
        valor: parseFloat(novoValorProduto)
      };
      setCardapio([...cardapio, novoItem]);
      setNovoProduto('');
      setNovoValorProduto('');
    }
  };

  const adicionarAoEstoque = () => {
    if (novoItemEstoque.trim() && novaQuantidade.trim() && novoValorEstoque.trim()) {
      const novoItem = {
        id: estoque.length + 1,
        nome: novoItemEstoque.trim(),
        quantidade: parseInt(novaQuantidade),
        valor: parseFloat(novoValorEstoque)
      };
      setEstoque([...estoque, novoItem]);
      setNovoItemEstoque('');
      setNovaQuantidade('');
      setNovoValorEstoque('');
    }
  };

  const aumentarQuantidade = (id) => {
    const novaQuantidade = prompt('Digite a quantidade a ser adicionada:');
    if (novaQuantidade && !isNaN(novaQuantidade)) {
      setEstoque(prevEstoque =>
        prevEstoque.map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade + parseInt(novaQuantidade) } : item
        )
      );
    }
  };

  const removerItemEstoque = (id) => {
    setEstoque(prevEstoque => prevEstoque.filter(item => item.id !== id));
  };

  const removerItemCardapio = (id) => {
    setCardapio(prevCardapio => prevCardapio.filter(item => item.id !== id));
  };

  return (
    <div className="estoque-container">
      <h2>Gerenciamento de Estoque</h2>
      <div className="sections-container">
        <div className="estoque-section">
          <h3>Adicionar Produto ao Cardápio Fixo</h3>
          <div className="input-group">
            <label>Nome do Produto:</label>
            <input
              type="text"
              value={novoProduto}
              onChange={(e) => setNovoProduto(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Valor do Produto:</label>
            <input
              type="number"
              value={novoValorProduto}
              onChange={(e) => setNovoValorProduto(e.target.value)}
            />
          </div>
          <button onClick={adicionarAoCardapio}>Adicionar ao Cardápio</button>

          <div className="item-list">
            <h4>Cardápio Fixo</h4>
            <ul>
              {cardapio.map(item => (
                <li key={item.id}>
                  {item.nome} - R${item.valor.toFixed(2)}
                  <div className="item-actions">
                    <button onClick={() => removerItemCardapio(item.id)}>Remover</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="estoque-section">
          <h3>Adicionar Item ao Estoque</h3>
          <div className="input-group">
            <label>Nome do Item:</label>
            <input
              type="text"
              value={novoItemEstoque}
              onChange={(e) => setNovoItemEstoque(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Quantidade:</label>
            <input
              type="number"
              value={novaQuantidade}
              onChange={(e) => setNovaQuantidade(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Valor:</label>
            <input
              type="number"
              value={novoValorEstoque}
              onChange={(e) => setNovoValorEstoque(e.target.value)}
            />
          </div>
          <button onClick={adicionarAoEstoque}>Adicionar ao Estoque</button>

          <div className="item-list">
            <h4>Itens em Estoque</h4>
            <ul>
              {estoque.map(item => (
                <li key={item.id}>
                  {item.nome} - {item.quantidade} unidades - R${item.valor.toFixed(2)}
                  <div className="item-actions">
                    <button onClick={() => aumentarQuantidade(item.id)}>Adicionar</button>
                    <button onClick={() => removerItemEstoque(item.id)}>Remover</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Estoque;
