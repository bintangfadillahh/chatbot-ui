import React from 'react';

const ChatHeader = ({ apiStatus, onDeleteChat }) => (
  <header className="chat-header">
    <h1 className="header-title">Chatbot Sa-ijaan</h1>
    <div className="header-status">
      <span 
        className={`status-indicator ${apiStatus.online ? 'online' : 'offline'}`}
        title={apiStatus.message}
      ></span>
      <button 
        onClick={onDeleteChat} 
        className="delete-button"
        disabled={!apiStatus.online}
        title={!apiStatus.online ? "Tidak dapat menghapus chat saat offline" : "Hapus riwayat chat"}
      >
        Hapus Chat
      </button>
    </div>
  </header>
);

export default ChatHeader;