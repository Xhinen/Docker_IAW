import React from 'react';

export default function SSLManagement() {
  const certs = [
    { id: 1, domain: 'www.tiendaropa-local.com', expires: '2026-06-01', status: 'OK' },
    { id: 2, domain: 'api.tiendaropa-local.com', expires: '2026-05-15', status: 'Expiring soon' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de certificados SSL/TLS</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Dominio</th>
            <th>Caducidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {certs.map(c => (
            <tr key={c.id}>
              <td>{c.domain}</td>
              <td>{c.expires}</td>
              <td>{c.status}</td>
              <td><button>Renovar</button> <button>Cargar nuevo</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
