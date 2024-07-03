import React, { useState, useEffect } from 'react';

const Estoque = () => {
  const [estoque, setEstoque] = useState(() => {
    const savedEstoque = localStorage.getItem('estoque');
    return savedEstoque ? JSON.parse(savedEstoque) : [];
  });

  useEffect(() => {
    localStorage.setItem('estoque', JSON.stringify(estoque));
  }, [estoque]);

  const adicionarItem = (nome, valor, quantidade) => {
    setEstoque(prevEstoque => [
      ...prevEstoque,
      { nome, valor: parseFloat(valor), quantidade: parseInt(quantidade, 10) }
    ]);
  };

  const removerItem = (index) => {
    setEstoque(prevEstoque => prevEstoque.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Estoque</h1>
      <div>
        <input type="text" placeholder="Nome do item" id="nomeItem" />
        <input type="number" placeholder="Valor" id="valorItem" />
        <input type="number" placeholder="Quantidade" id="quantidadeItem" />
        <button
          onClick={() =>
            adicionarItem(
              document.getElementById('nomeItem').value,
              document.getElementById('valorItem').value,
              document.getElementById('quantidadeItem').value
            )
          }
        >
          Adicionar Item
        </button>
      </div>
      <ul>
        {estoque.map((item, index) => (
          <li key={index}>
            {item.nome} - R${item.valor.toFixed(2)} - Quantidade: {item.quantidade}
            <button onClick={() => removerItem(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
