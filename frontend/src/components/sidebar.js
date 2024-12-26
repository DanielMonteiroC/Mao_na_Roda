import React from 'react';

const Sidebar = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '250px', height: '100vh', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>×</button>
      <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
        <li><button onClick={() => alert("Editar perfil")}>Editar perfil</button></li>
        <li><button onClick={() => alert("Relatar bug")}>Relatar bug</button></li>
        <li><button onClick={() => alert("Modo escuro")}>Modo escuro</button></li>
        <li><button onClick={() => alert("Logout")}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
