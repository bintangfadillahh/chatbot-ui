import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';
import QuickChat from './QuickChat'; // <-- Impor komponen QuickChat

const MessageList = ({ messages, isTyping, showQuickChat, onQuickChatClick }) => {
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
          <ReactMarkdown
            components={{
              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
            }}
          >
            {msg.text}
          </ReactMarkdown>
        </div>
      ))}
      
      {/* Tampilkan QuickChat jika showQuickChat bernilai true */}
      {showQuickChat && <QuickChat onQuickChatClick={onQuickChatClick} />}

      {isTyping && <TypingIndicator />}
      <div ref={endOfMessagesRef} />
    </main>
  );
};

export default MessageList;