import React from 'react';
import Chatbot from './components/Chatbot';

export default function HomePage() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Chatbot de Sushi</h1>
      <Chatbot />
    </main>
  );
}
