import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'; // <-- 1. Impor ReactMarkdown
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <main className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
        >
          {/* 2. Gunakan ReactMarkdown untuk merender teks */}
          <ReactMarkdown
            components={{
              // 3. Modifikasi elemen 'a' (link) agar terbuka di tab baru
              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
            }}
          >
            {msg.text}
          </ReactMarkdown>
        </div>
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endOfMessagesRef} />
    </main>
  );
};

export default MessageList;