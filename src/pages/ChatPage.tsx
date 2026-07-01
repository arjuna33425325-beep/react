import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import polinesLogo from '../assets/polines.png';

interface MessageItem {
  text: string;
  isSender: boolean;
  time: string;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      text: 'Bapak izin menginformasikan monitor di ruangan 2305 mati pak jadi sebagian dari kami tidak bisa praktikum apakah bisa ditangani lebih segera?',
      isSender: true,
      time: '12:19 pm',
    },
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate sending an image message
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
      setMessages((prev) => [
        ...prev,
        {
          text: `[Foto terlampir: ${file.name}]`,
          isSender: true,
          time,
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    setMessages((prev) => [
      ...prev,
      {
        text: message.trim(),
        isSender: true,
        time,
      },
    ]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <div
        className="text-white px-5 py-4 flex items-center gap-3"
        style={{ background: 'linear-gradient(to bottom, #1565C0, #1e88e5)', minHeight: '72px' }}
      >
        <button onClick={() => navigate(-1)} className="p-1 text-white">
          <Icon icon="solar:alt-arrow-left-linear" width={26} />
        </button>
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
          alt="Petugas"
          className="w-11 h-11 rounded-full object-cover border border-white/20"
        />
        <h2 className="font-bold text-lg flex-1">Petugas</h2>
        <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center p-1">
          <img src={polinesLogo} alt="Polines" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`${
              msg.isSender ? 'bg-[#1e58b3] text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'
            } p-3 rounded-2xl max-w-[85%] shadow-sm`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <div className="flex justify-end items-center gap-1 mt-1 opacity-80">
                <span className="text-[10px]">{msg.time}</span>
                {msg.isSender && <Icon icon="solar:check-read-linear" width={14} />}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          {/* Camera / Attachment Button */}
          <button className="text-gray-400 hover:text-gray-600 p-2" onClick={handleCameraClick}>
            <Icon icon="solar:paperclip-linear" width={24} className="transform -rotate-45" />
          </button>
          
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* Text Input Container */}
          <div className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Message" 
              className="flex-1 outline-none text-sm bg-transparent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="text-gray-400 hover:text-gray-600">
              <Icon icon="solar:emoji-funny-circle-linear" width={22} />
            </button>
          </div>
          
          {/* Send / Mic Button */}
          {message.trim() ? (
            <button className="text-[#1e58b3] hover:text-blue-800 p-2" onClick={handleSendMessage}>
              <Icon icon="solar:send-bold" width={24} />
            </button>
          ) : (
            <button className="text-gray-400 p-2">
              <Icon icon="solar:microphone-2-linear" width={24} />
            </button>
          )}
        </div>
      </div>
      
      {/* iOS Home Indicator Spacer */}
      <div className="h-6 bg-white w-full flex items-center justify-center">
        <div className="w-1/3 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
