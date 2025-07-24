import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isTyping, apiOnline }) => {
  const [text, setText] = useState('');
  const isDisabled = isTyping || !apiOnline;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isDisabled) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <footer className="message-input-bar">
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          className="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isDisabled ? "Menunggu respon..." : "Ketik pertanyaan Anda..."}
          disabled={isDisabled}
        />
        <button type="submit" className="send-button" aria-label="Kirim Pesan" disabled={isDisabled || !text.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </footer>
  );
};

export default MessageInput;