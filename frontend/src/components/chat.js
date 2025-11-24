import React, { useState, useEffect, useRef } from 'react';
import { enviarMensagem, fetchMensagemParaUsuario } from '../services/api';

export default function Chat({ usuario }) {
    const [texto, setTexto] = useState('');
    const [mensagens, setMensagens] = useState([]);
    const boxRef = useRef(null);

    useEffect(() => {
        if (usuario) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario]);

    async function load() {
        try {
            const data = await fetchMensagemParaUsuario(usuario);
            setMensagens(data);
            setTimeout(() => {
                if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
            }, 50);
        } catch (err) {
            console.error('Erro ao buscar as mensagens.', err);
        }
    }

    async function handleSend(e) {
        e.preventDefault();
        if (!texto.trim()) return;

        console.log("Tentando enviar:", { usuario, texto });

        try {
            const saved = await enviarMensagem(usuario, texto);
            setMensagens(prev => [...prev, saved]);
            setTexto('');
            setTimeout(() => {
                if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
            }, 50);
        } catch (err) {
            console.error('Erro ao enviar a mensagem.', err);
        }
    }

    return (
        <div>
            <h2>Chat — Usuário {usuario}</h2>

            <div
                ref={boxRef}
                style={{ border: '1px solid #ddd', padding: 8, height: 300, overflowY: 'auto' }}
            >
                {mensagens.map(m => (
                    <div key={m.id} style={{ marginBottom: 12 }}>
                        <div><strong>Você:</strong> {m.texto}</div>
                        <div style={{ marginLeft: 12 }}><em>Resposta:</em> {m.texto_resposta}</div>
                        <small style={{ color: '#666' }}>{new Date(m.criado).toLocaleString()}</small>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} style={{ marginTop: 8 }}>
                <textarea
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                    rows={3}
                    cols={50}
                    placeholder="Digite sua mensagem..."
                />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
