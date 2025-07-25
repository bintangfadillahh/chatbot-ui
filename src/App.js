import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ConfirmationModal from './components/ConfirmationModal';
import './components/Chat.css';

const API_BASE_URL = 'https://chatbot-api-service-705987001228.asia-southeast2.run.app';

export default function App() {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState({ online: false, message: 'Menghubungkan ke API...' });
  const [showQuickChat, setShowQuickChat] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);

    const checkApiStatus = async () => {
      setIsTyping(true);
      try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (response.ok) {
          const data = await response.json();
          setApiStatus({ online: true, message: data.message });
          setMessages([{ id: Date.now(), text: 'Halo! Saya adalah chatbot Sa-ijaan. Apa yang ingin Anda tanyakan?', sender: 'bot' }]);
        } else { throw new Error('API tidak merespon dengan benar.'); }
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus({ online: false, message: 'Gagal terhubung ke API.' });
        setMessages([{ id: Date.now(), text: 'Maaf, saya tidak dapat terhubung ke server saat ini.', sender: 'bot' }]);
      } finally { setIsTyping(false); }
    };
    checkApiStatus();
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim() || isTyping || !apiStatus.online) return;
    if (showQuickChat) { setShowQuickChat(false); }

    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, session_id: sessionId }) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const botResponse = { id: Date.now() + 1, text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { id: Date.now() + 1, text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally { setIsTyping(false); }
  };

  const executeDeleteChat = async () => {
    if (!sessionId || !apiStatus.online) return;
    setIsModalOpen(false); // Tutup modal setelah konfirmasi
    setIsTyping(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clear_memory`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId }) });
      if (!response.ok) throw new Error('Gagal membersihkan memori di server.');
      setMessages([{ id: Date.now(), text: 'Memori percakapan telah dibersihkan. Anda bisa memulai dari awal.', sender: 'bot' }]);
      setShowQuickChat(true);
    } catch (error) {
      console.error("Error clearing memory:", error);
      const errorMessage = { id: Date.now(), text: 'Maaf, gagal membersihkan memori di server.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally { setIsTyping(false); }
  };

  return (
    <>
      <div className="chat-app-container">
        <div className="chat-window">
          <ChatHeader 
            onRequestDelete={() => setIsModalOpen(true)}
            apiStatus={apiStatus}
          />
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            showQuickChat={showQuickChat} 
            onQuickChatClick={handleSendMessage} 
          />
          <MessageInput 
            onSendMessage={handleSendMessage} 
            isTyping={isTyping} 
            apiOnline={apiStatus.online} 
          />
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={executeDeleteChat}
      />
    </>
  );
}