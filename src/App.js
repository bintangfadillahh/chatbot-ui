import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css';

// URL API Backend Anda
const API_BASE_URL = 'https://chatbot-api-service-705987001228.asia-southeast2.run.app';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ online: false, message: 'Menghubungkan ke API...' });

  // Efek ini berjalan sekali saat komponen pertama kali dimuat
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);

    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (response.ok) {
          const data = await response.json();
          setApiStatus({ online: true, message: data.message });
          setMessages([{ sender: 'bot', text: 'Halo! Saya adalah chatbot Sa-ijaan. Apa yang ingin Anda tanyakan?' }]);
        } else {
          throw new Error('API tidak merespon dengan benar.');
        }
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus({ online: false, message: 'Gagal terhubung ke API. Pastikan backend sudah berjalan.' });
        setMessages([{ sender: 'bot', text: 'Maaf, saya tidak dapat terhubung ke server saat ini.' }]);
      }
    };
    
    checkApiStatus();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !apiStatus.online) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, session_id: sessionId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: 'bot', text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearMemory = async () => {
    if (!sessionId || !apiStatus.online) return;
      
    try {
      const response = await fetch(`${API_BASE_URL}/clear_memory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
        
      if(!response.ok) throw new Error('Gagal membersihkan memori.');

      setMessages([{ sender: 'bot', text: 'Memori percakapan telah dibersihkan. Anda bisa memulai percakapan baru.' }]);

    } catch (error) {
      console.error("Error clearing memory:", error);
      const errorMessage = { sender: 'bot', text: 'Maaf, gagal membersihkan memori di server.' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chatbot-container">
      <ChatHeader 
        apiStatus={apiStatus} 
        onClearMemory={handleClearMemory} 
      />
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      <MessageInput 
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        apiStatus={apiStatus}
      />
    </div>
  );
}

export default App;