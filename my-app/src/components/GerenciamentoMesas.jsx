import React, { useState, useEffect } from 'react';
import Mesa from './Mesa';
import JuntarMesas from './JuntarMesas';
import Relatorio from './Relatorio';

const initialMesas = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  pedidos: []
}));

const GerenciamentoMesas = () => {
  const [mesas, setMesas] = useState(() => {
    const savedMesas = localStorage.getItem('mesas');
    return savedMesas ? JSON.parse(savedMesas) : initialMesas;
  });

  useEffect(() => {
    localStorage.setItem('mesas', JSON.stringify(mesas));
  }, [mesas]);

  const adicionarPedido = (mesaId, pedido) => {
    setMesas(prevMesas =>
      prevMesas.map(mesa =>
        mesa.id === mesaId ? { ...mesa, pedidos: [...mesa.pedidos, pedido] } : mesa
      )
    );
  };
  
  const removerPedido = (mesaId, pedidoIndex) => {
    setMesas(prevMesas =>
      prevMesas.map(mesa =>
        mesa.id === mesaId ? {
          ...mesa, pedidos: mesa.pedidos.filter((_, index) => index !== pedidoIndex)
        } : mesa
      )
    );
  };

  const juntarMesas = (mesa1Id, mesa2Id) => {
    setMesas(prevMesas => {
      const mesa1Index = prevMesas.findIndex(mesa => mesa.id === mesa1Id);
      const mesa2Index = prevMesas.findIndex(mesa => mesa.id === mesa2Id);
      if (mesa1Index === -1 || mesa2Index === -1) return prevMesas;

      const mesasAtualizadas = [...prevMesas];
      const mesa1 = mesasAtualizadas[mesa1Index];
      const mesa2 = mesasAtualizadas[mesa2Index];

      // Criando nova mesa para representar a junção no relatório
      const novaMesa = {
        id: mesa1.id, // Pode ser uma escolha de como representar a mesa combinada
        pedidos: [...mesa1.pedidos, ...mesa2.pedidos],
        mesasJuntas: [mesa1.id, mesa2.id]
      };

      // Atualizando a mesa 1 para refletir a junção no relatório
      mesasAtualizadas[mesa1Index] = novaMesa;

      return mesasAtualizadas;
    });
  };

  const separarMesas = (mesa1Id) => {
    setMesas(prevMesas => {
      const mesa1Index = prevMesas.findIndex(mesa => mesa.id === mesa1Id);
      if (mesa1Index === -1) return prevMesas;

      const mesa1 = prevMesas[mesa1Index];
      if (!mesa1.mesasJuntas) return prevMesas; // Se não estiver juntada, retornar mesas sem alterações

      // Separando mesas
      const mesasSeparadas = [...prevMesas];
      mesasSeparadas[mesa1Index] = {
        ...mesa1,
        pedidos: mesa1.pedidos.filter(pedido => !mesa1.pedidos.includes(pedido)), // Exemplo de filtro, ajustar conforme necessário
        mesasJuntas: null
      };

      return mesasSeparadas;
    });
  };

  return (
    <div className='flex'>
      <div className="mesas-container box">
        {mesas.map(mesa => (
          <Mesa
            key={mesa.id}
            mesa={mesa}
            adicionarPedido={adicionarPedido}
            removerPedido={removerPedido}
          />
        ))}
      </div>
      <div className='box'><Relatorio mesas={mesas} /></div>
      <div className='box'><JuntarMesas mesas={mesas} juntarMesas={juntarMesas} separarMesas={separarMesas} /></div>
    </div>
  );
};

export default GerenciamentoMesas;
