import React, { useEffect, useState } from 'react';
import { fetchMensagemParaUsuario } from '../services/api';

export default function Historico({ usuario }) {
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        if (usuario) {
            fetchMensagemParaUsuario(usuario)
                .then(data => setMensagens(data))
                .catch(err => {
                    console.error('Erro ao buscar histórico', err);
                });
        }
    }, [usuario]);

    return (
        <div>
            <h2>Histórico — Usuário {usuario}</h2>
            <div>
                {mensagens.length === 0 && <p>Nenhuma mensagem ainda.</p>}
                {mensagens.map(m => (
                    <div key={m.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                        <div><strong>Pergunta:</strong> {m.texto}</div>
                        <div><strong>Resposta:</strong> {m.texto_resposta}</div>
                        <small style={{ color: '#666' }}>{new Date(m.criado).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
