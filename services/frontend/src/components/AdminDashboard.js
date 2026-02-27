import React from 'react';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Estado de Nginx, peticiones HTTP en tiempo real y gestión de copias de seguridad (simulado).</p>
      <ul>
        <li>Nginx: <strong>active</strong></li>
        <li>Peticiones en última hora: <strong>128</strong></li>
        <li>Backups disponibles: <strong>3</strong></li>
      </ul>
    </div>
  );
}
