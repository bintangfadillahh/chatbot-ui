import React from 'react';

// Daftar pertanyaan umum (FAQ)
const faqQuestions = [
  "Apa saja fasilitas yang tersedia?",
  "Apakah ada kamar kosong saat ini?",
  "Bagaimana cara menghubungi pengurus asrama?",
  "Di mana lokasi asrama?",
  "Bagaimana cara mendaftar menjadi anggota asrama?",
];

const QuickChat = ({ onQuickChatClick }) => {
  return (
    <div className="quick-chat-container">
      <p className="quick-chat-title">Atau pilih pertanyaan cepat:</p>
      <div className="quick-chat-buttons">
        {faqQuestions.map((question, index) => (
          <button 
            key={index} 
            className="quick-chat-button"
            onClick={() => onQuickChatClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickChat;