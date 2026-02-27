import React from 'react';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido a la tienda</h1>
      <p>Pagina minimalista inspirada en Zara con imágenes de alta resolución y navegación limpia.</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[1, 2, 3].map(i => (
          <img
            key={i}
            src={`https://via.placeholder.com/400x300?text=Producto+${i}`}
            alt={`Producto ${i}`}
            style={{ width: '400px', height: '300px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
}
