import React, { useState, useEffect } from 'react';
import PesquisaProfissao from './PesquisaProfissao';
import './Home.css';

const Home = () => {
  const [prestadores, setPrestadores] = useState([]);
  const [prestadoresFiltrados, setPrestadoresFiltrados] = useState([]);
  const [prestadorSelecionado, setPrestadorSelecionado] = useState(null);
  const [abaVisivel, setAbaVisivel] = useState(false);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [editar, setEditar] = useState(false);  

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/users')
      .then((response) => response.json())
      .then((data) => setPrestadores(data))
      .catch((error) => console.error('Erro ao buscar prestadores:', error));
  }, []);

  const realizarPesquisa = (termoPesquisa) => {
    const resultados = prestadores.filter((prestador) =>
      prestador.profissao && prestador.profissao.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setPrestadoresFiltrados(resultados);
    setAbaVisivel(true);
  };

  const selecionarPrestador = (prestador) => {
    setPrestadorSelecionado(prestador);
    setAbaVisivel(false);
  };

  const editarPerfil = () => {
    setEditar(true);  
  };

  const salvarEdicoes = () => {
    
    fetch(`http://localhost:5000/api/auth/users/${prestadorSelecionado._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: prestadorSelecionado.nome,
        profissao: prestadorSelecionado.profissao,
        descricao: prestadorSelecionado.descricao,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrestadores(prestadores.map((prestador) =>
          prestador._id === prestadorSelecionado._id ? data : prestador
        ));
        setEditar(false);  
      })
      .catch((error) => console.error('Erro ao salvar as edições:', error));
  };

  const fecharAba = () => {
    setAbaVisivel(false);
  };

  const toggleMenu = () => {
    setMenuVisivel(!menuVisivel);
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="menu-button" onClick={toggleMenu}>☰</button>
        <div className="search-bar">
          <PesquisaProfissao onPesquisar={realizarPesquisa} />
        </div>
      </header>

      {menuVisivel && (
        <div className="left-sidebar">
          <button onClick={editarPerfil} className="menu-item">Editar Perfil</button>
          <button onClick={() => alert('Reportado!')} className="menu-item">Reporte</button>
        </div>
      )}

      <div className="main-content">
        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=... (Link do mapa)" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <aside className="sidebar">
          {prestadorSelecionado && !editar ? (
            <div className="perfil-container">
              <h3>Perfil de {prestadorSelecionado.nome}</h3>
              <p><strong>Profissão:</strong> {prestadorSelecionado.profissao}</p>
              <p><strong>Descrição:</strong> {prestadorSelecionado.descricao || 'Sem descrição disponível'}</p>
              <p><strong>Avaliação:</strong> {prestadorSelecionado.avaliacao || 'Sem avaliações ainda'}</p>
              <button onClick={editarPerfil} className="edit-button">✏️ Editar</button>
            </div>
          ) : (
            !editar && (
              <>
                <h3>Anúncios</h3>
                <div className="ad">Anúncio 1</div>
                <div className="ad">Anúncio 2</div>
                <div className="ad">Anúncio 3</div>
              </>
            )
          )}

          {editar && prestadorSelecionado && (
            <div className="perfil-edit-container">
              <h3>Editar Perfil de {prestadorSelecionado.nome}</h3>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={prestadorSelecionado.nome}
                onChange={(e) => setPrestadorSelecionado({ ...prestadorSelecionado, nome: e.target.value })}
              />
              <label htmlFor="profissao">Profissão:</label>
              <input
                type="text"
                id="profissao"
                value={prestadorSelecionado.profissao}
                onChange={(e) => setPrestadorSelecionado({ ...prestadorSelecionado, profissao: e.target.value })}
              />
              <label htmlFor="descricao">Descrição:</label>
              <textarea
                id="descricao"
                value={prestadorSelecionado.descricao}
                onChange={(e) => setPrestadorSelecionado({ ...prestadorSelecionado, descricao: e.target.value })}
              />
              <button onClick={salvarEdicoes} className="save-button">Salvar</button>
              <button onClick={() => setEditar(false)} className="cancel-button">Cancelar</button>
            </div>
          )}
        </aside>
      </div>

      {abaVisivel && (
        <div className="resultados-container">
          <button className="fechar-aba" onClick={fecharAba}>Fechar</button>
          <div className="prestadores-list">
            <ul>
              {prestadoresFiltrados.length > 0 ? (
                prestadoresFiltrados.map((prestador) => (
                  <li key={prestador._id} onClick={() => selecionarPrestador(prestador)}>
                    {prestador.nome} - {prestador.profissao}
                  </li>
                ))
              ) : (
                <p>Nenhum prestador encontrado</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
