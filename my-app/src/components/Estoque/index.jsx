import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem('estoque', JSON.stringify(estoque));
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem('cardapio', JSON.stringify(cardapio));
  }, [cardapio]);

  const adicionarItem = (nome, valor, quantidade) => {
    const novoItem = {
      id: Date.now(),
      nome,
      valor: parseFloat(valor),
      quantidade: parseInt(quantidade, 10)
    };

    setEstoque(prevEstoque => [...prevEstoque, novoItem]);
    setCardapio(prevCardapio => [...prevCardapio, { nome, valor: parseFloat(valor) }]);
  };

  const adicionarQuantidade = (index, quantidade) => {
    const novaQuantidade = parseInt(quantidade, 10);
    if (!isNaN(novaQuantidade)) {
      setEstoque(prevEstoque =>
        prevEstoque.map((item, i) =>
          i === index ? { ...item, quantidade: item.quantidade + novaQuantidade } : item
        )
      );
    }
  };

  const removerItem = (index) => {
    setEstoque(prevEstoque => prevEstoque.filter((_, i) => i !== index));
  };

  return (
    <div className="estoque-container">
      <h1 className="estoque-title">Gerenciamento de Estoque</h1>
      <div className="input-container">
        <input type="text" placeholder="Nome do item" id="nomeItem" className="input-field" />
        <input type="number" placeholder="Valor" id="valorItem" className="input-field" />
        <input type="number" placeholder="Quantidade" id="quantidadeItem" className="input-field" />
        <button
          onClick={() =>
            adicionarItem(
              document.getElementById('nomeItem').value,
              document.getElementById('valorItem').value,
              document.getElementById('quantidadeItem').value
            )
          }
          className="add-button"
        >
          Adicionar Item
        </button>
      </div>
      <ul className="item-list">
        {estoque.map((item, index) => (
          <li key={index} className="item">
            {item.nome} - R${item.valor.toFixed(2)} - Quantidade: {item.quantidade}
            <input
              type="number"
              placeholder="Adicionar Quantidade"
              className="input-quantidade"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  adicionarQuantidade(index, e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button onClick={() => removerItem(index)} className="remove-button">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
