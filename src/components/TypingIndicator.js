import React from 'react';
import '../App.css'; // Kita masih menggunakan App.css untuk styling terpusat

function TypingIndicator() {
  return (
    <div className="message-bubble bot typing">
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
  );
}

export default TypingIndicator;