import React from 'react';
import '../App.css';

function ChatHeader({ apiStatus, onClearMemory }) {
  return (
    <header className="chatbot-header">
      <h1>Chatbot Sa-ijaan</h1>
      <div className="header-controls">
        <span 
          className={`api-status ${apiStatus.online ? 'online' : 'offline'}`} 
          title={apiStatus.message}
        >
          ●
        </span>
        <button 
          onClick={onClearMemory} 
          className="clear-button" 
          title="Mulai Percakapan Baru"
          disabled={!apiStatus.online}
        >
          Hapus Chat
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;