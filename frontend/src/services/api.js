// frontend/src/services/api.js
const API_BASE = "http://127.0.0.1:8000/api";

/**
 * enviarMensagem: envia uma mensagem ao backend
 * @param {string} enviado - 'A' ou 'B'
 * @param {string} texto - texto da mensagem
 * @returns {Promise<object>}
 */
export async function enviarMensagem(enviado, texto) {
    const res = await fetch(`${API_BASE}/mensagem/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enviado, texto })
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error('Erro ao enviar mensagem: ' + res.status + ' - ' + text);
    }
    return res.json();
}

/**
 * fetchMensagemParaUsuario: busca histórico de mensagens para um usuário
 * @param {string} usuario - 'A' ou 'B'
 * @returns {Promise<Array>}
 */
export async function fetchMensagemParaUsuario(usuario) {
    const res = await fetch(`${API_BASE}/mensagem/?usuario=${encodeURIComponent(usuario)}`);
    if (!res.ok) {
        const text = await res.text();
        throw new Error('Erro ao buscar mensagens: ' + res.status + ' - ' + text);
    }
    return res.json();
}