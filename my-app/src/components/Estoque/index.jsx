import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
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

  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('classes');
    return savedClasses ? JSON.parse(savedClasses) : ['Cardápio', 'Bebidas', 'Variedades'];
  });

  const [novaClasse, setNovaClasse] = useState('');
  const [editandoClasse, setEditandoClasse] = useState(null);
  const [novoProduto, setNovoProduto] = useState('');
  const [novoValorProduto, setNovoValorProduto] = useState('');
  const [novoItemEstoque, setNovoItemEstoque] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [novoValorEstoque, setNovoValorEstoque] = useState('');
  const [novaClasseItem, setNovaClasseItem] = useState('');
  const [pesquisa, setPesquisa] = useState('');

  const verificarEstoque = useCallback(() => {
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
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem('estoque', JSON.stringify(estoque));
    verificarEstoque();
  }, [estoque, verificarEstoque]);

  useEffect(() => {
    localStorage.setItem('cardapio', JSON.stringify(cardapio));
  }, [cardapio]);

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  const adicionarClasse = () => {
    if (novaClasse.trim() && !classes.includes(novaClasse.trim())) {
      setClasses([...classes, novaClasse.trim()]);
      setNovaClasse('');
    } else {
      toast.error('Classe já existente ou inválida.');
    }
  };

  const editarClasse = (classe) => {
    setNovaClasse(classe);
    setEditandoClasse(classe);
  };

  const atualizarClasse = () => {
    if (novaClasse.trim() && !classes.includes(novaClasse.trim())) {
      setClasses(classes.map(classe => (classe === editandoClasse ? novaClasse.trim() : classe)));
      setNovaClasse('');
      setEditandoClasse(null);
    } else {
      toast.error('Classe já existente ou inválida.');
    }
  };

  const removerClasse = (classe) => {
    setClasses(classes.filter(c => c !== classe));
  };

  const adicionarAoCardapio = () => {
    if (novoProduto.trim() && novoValorProduto.trim() && novaClasseItem.trim()) {
      const novoItem = {
        id: cardapio.length + 1,
        nome: novoProduto.trim(),
        valor: parseFloat(novoValorProduto),
        classe: novaClasseItem.trim()
      };
      setCardapio([...cardapio, novoItem]);
      setNovoProduto('');
      setNovoValorProduto('');
      setNovaClasseItem('');
    }
  };

  const adicionarAoEstoque = () => {
    if (novoItemEstoque.trim() && novaQuantidade.trim() && novoValorEstoque.trim() && novaClasseItem.trim()) {
      const novoItem = {
        id: estoque.length + 1,
        nome: novoItemEstoque.trim(),
        quantidade: parseInt(novaQuantidade),
        valor: parseFloat(novoValorEstoque),
        classe: novaClasseItem.trim()
      };
      setEstoque([...estoque, novoItem]);
      setNovoItemEstoque('');
      setNovaQuantidade('');
      setNovoValorEstoque('');
      setNovaClasseItem('');
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

  const renderizarItensPorClasse = (items) => {
    const sortedItems = items.sort((a, b) => a.nome.localeCompare(b.nome));
    return classes.map(classe => (
      <div key={classe} className="item-classe-section">
        <h3>{classe}</h3>
        <ul>
          {sortedItems.filter(item => item.classe === classe && item.nome.toLowerCase().includes(pesquisa.toLowerCase())).map(item => (
            <li key={item.id}>
              {item.nome} - {item.quantidade ? `${item.quantidade} unidades - ` : ''}R${item.valor.toFixed(2)} - Classe: {item.classe}
              <div className="item-actions">
                {item.quantidade && (
                  <>
                    <button onClick={() => aumentarQuantidade(item.id)}>Adicionar</button>
                    <button onClick={() => removerItemEstoque(item.id)}>Remover</button>
                  </>
                )}
                {!item.quantidade && (
                  <button onClick={() => removerItemCardapio(item.id)}>Remover</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="estoque-container">
      <aside className="sidebar">
        <h3>Configurações</h3>
        <div className="input-group">
          <label>Nova Classe:</label>
          <input
            type="text"
            value={novaClasse}
            onChange={(e) => setNovaClasse(e.target.value)}
          />
          {editandoClasse ? (
            <button onClick={atualizarClasse}><FaEdit /> Atualizar Classe</button>
          ) : (
            <button onClick={adicionarClasse}><FaPlus /> Adicionar Classe</button>
          )}
        </div>
        <div className="lista-classes">
          <h4>Classes Existentes</h4>
          <ul>
            {classes.map(classe => (
              <li key={classe}>
                {classe}
                <div className="classe-actions">
                  <button onClick={() => editarClasse(classe)}><FaEdit /></button>
                  <button onClick={() => removerClasse(classe)}><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="main-content">
        <h2>Gerenciamento de Estoque</h2>
        <div className="sections-container">
          <div className="boxs-estoque">
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
              <div className="input-group">
                <label>Classe do Produto:</label>
                <select
                  value={novaClasseItem}
                  onChange={(e) => setNovaClasseItem(e.target.value)}
                >
                  <option value="">Selecione uma classe</option>
                  {classes.map(classe => (
                    <option key={classe} value={classe}>{classe}</option>
                  ))}
                </select>
              </div>
              <button onClick={adicionarAoCardapio}><FaPlus /> Adicionar ao Cardápio</button>
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
                <label>Valor Unitário:</label>
                <input
                  type="number"
                  value={novoValorEstoque}
                  onChange={(e) => setNovoValorEstoque(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Classe do Item:</label>
                <select
                  value={novaClasseItem}
                  onChange={(e) => setNovaClasseItem(e.target.value)}
                >
                  <option value="">Selecione uma classe</option>
                  {classes.map(classe => (
                    <option key={classe} value={classe}>{classe}</option>
                  ))}
                </select>
              </div>
              <button onClick={adicionarAoEstoque}><FaPlus /> Adicionar ao Estoque</button>
            </div>
          </div>

          <div className="pesquisa-section">
            <h3>Pesquisa de Itens</h3>
            <div className="input-group">
              <label>Pesquisar:</label>
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
              <button><FaSearch /></button>
            </div>
          </div>

          <div className="estoque-list">
            <h3>Itens em Estoque</h3>
            {renderizarItensPorClasse(estoque)}
          </div>

          <div className="cardapio-list">
            <h3>Cardápio Fixo</h3>
            {renderizarItensPorClasse(cardapio)}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Estoque;
