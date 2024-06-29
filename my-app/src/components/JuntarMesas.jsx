import React, { useState } from 'react';

const JuntarMesas = ({ mesas, juntarMesas, separarMesas }) => {
  const [mesa1Id, setMesa1Id] = useState('');
  const [mesa2Id, setMesa2Id] = useState('');

  const handleJuntarMesas = () => {
    const id1 = parseInt(mesa1Id);
    const id2 = parseInt(mesa2Id);

    if (!isNaN(id1) && !isNaN(id2) && id1 !== id2) {
      juntarMesas(id1, id2);
      setMesa1Id('');
      setMesa2Id('');
    } else {
      alert('Por favor, selecione duas mesas diferentes para juntar.');
    }
  };

  const handleSepararMesas = () => {
    const id = parseInt(mesa1Id);

    if (!isNaN(id)) {
      separarMesas(id);
      setMesa1Id('');
    } else {
      alert('Por favor, selecione uma mesa válida para separar.');
    }
  };

  return (
    <div className="juntar-mesas-container">
      <h2>Juntar ou Separar Mesas</h2>
      <select value={mesa1Id} onChange={e => setMesa1Id(e.target.value)}>
        <option value="">Selecione a Mesa 1</option>
        {mesas.map(mesa => (
          <option key={mesa.id} value={mesa.id}>{mesa.id}</option>
        ))}
      </select>
      <select value={mesa2Id} onChange={e => setMesa2Id(e.target.value)}>
        <option value="">Selecione a Mesa 2</option>
        {mesas.map(mesa => (
          <option key={mesa.id} value={mesa.id}>{mesa.id}</option>
        ))}
      </select>
      <button onClick={handleJuntarMesas}>Juntar Mesas</button>
      <button onClick={handleSepararMesas}>Separar Mesa</button>
    </div>
  );
};

export default JuntarMesas;
