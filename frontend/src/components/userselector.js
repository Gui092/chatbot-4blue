import React from 'react';

export default function UserSelector({ user, setUser }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <label>Usuário ativo: </label>
            <select value={user} onChange={e => setUser(e.target.value)}>
                <option value="A">Usuário A</option>
                <option value="B">Usuário B</option>
            </select>
        </div>
    );
}
