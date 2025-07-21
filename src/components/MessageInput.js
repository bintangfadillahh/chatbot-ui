import React from 'react';
import '../App.css';

function MessageInput({ input, onInputChange, onSubmit, isLoading, apiStatus }) {
  return (
    <footer className="chatbot-footer">
      <div className="message-input-bar">
        <form onSubmit={onSubmit} className="message-form">
          <input
            className="message-input"
            type="text"
            value={input}
            onChange={onInputChange}
            placeholder={apiStatus.online ? "Ketik pertanyaan Anda..." : "API tidak terhubung"}
            disabled={!apiStatus.online || isLoading}
            autoFocus
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Kirim
          </button>
        </form>
      </div>
    </footer>
  );
}

export default MessageInput;