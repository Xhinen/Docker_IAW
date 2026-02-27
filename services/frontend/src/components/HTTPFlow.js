import React from 'react';

export default function HTTPFlow() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>HTTP Flow Dashboard</h1>
      <p>Visualización del viaje de una petición HTTP (simulado).</p>
      <svg width="600" height="200">
        <line x1="50" y1="50" x2="550" y2="50" stroke="green" strokeWidth="4" />
        <text x="50" y="40">Navegador</text>
        <text x="550" y="40">Servidor</text>
        <circle cx="50" cy="50" r="20" fill="blue" />
        <circle cx="550" cy="50" r="20" fill="blue" />
        <text x="300" y="80" fill="red">200 OK</text>
      </svg>
    </div>
  );
}
