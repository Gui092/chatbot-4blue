import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import UserSelector from './components/userselector';
import Chat from './components/chat';
import Historico from './components/historico';

function App() {

  const [usuario, setUser] = useState(() => localStorage.getItem('activeUser') || 'A');
  useEffect(() => {
    localStorage.setItem('activeUser', usuario);
  }, [usuario]);

  return (
    <Router>
      <div style={{ padding: 20 }}>

        <h1>Chat Simulado</h1>

        <UserSelector user={usuario} setUser={setUser} />

        <nav style={{ marginBottom: 12 }}>
          <Link to="/chat" style={{ marginRight: 8 }}>Chat</Link>
          <Link to="/historico">Histórico</Link>
        </nav>

        <Routes>
          <Route path="/chat" element={<Chat usuario={usuario} />} />
          <Route path="/historico" element={<Historico usuario={usuario} />} />
          <Route path="*" element={<Chat usuario={usuario} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
