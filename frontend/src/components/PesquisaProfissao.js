import React, { useState } from 'react';

const PesquisaProfissao = ({ onPesquisar }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const handlePesquisar = () => {
    onPesquisar(termoPesquisa); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite a profissão"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />
      <button onClick={handlePesquisar}>Pesquisar</button>
    </div>
  );
};

export default PesquisaProfissao;
