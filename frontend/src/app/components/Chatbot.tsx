'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const newUserMessage: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      // Llamada al endpoint de chatbot en el backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/message`,
        { message: input }
      );

      const botReply: ChatMessage = {
        sender: 'bot',
        text: response.data.reply || 'Lo siento, no tengo respuesta.',
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply: ChatMessage = {
        sender: 'bot',
        text: 'Hubo un error al procesar tu mensaje. Intenta de nuevo.',
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#FFF',
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ ...styles.message, alignSelf: 'flex-start' }}>Bot está pensando...</div>}
      </div>

      <form onSubmit={handleSend} style={styles.form}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Enviar
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '8px',
    height: '500px',
    padding: '1rem',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  message: {
    maxWidth: '70%',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
