import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';
import '../App.css';

function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  // Fungsi untuk scroll otomatis ke pesan terbaru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  return (
    <main className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message-bubble ${msg.sender}`}>
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </main>
  );
}

export default MessageList;