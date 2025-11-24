import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { createChatSession } from '../../services/geminiService';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { GenerateContentResponse } from '@google/genai';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat
    chatRef.current = createChatSession("Ты — виртуальный ассистент агентства TechFlow. Твоя цель — отвечать на вопросы о веб-разработке, настройке серверов и базах данных. Будь краток и профессионален.");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: input });
      
      let botResponseText = '';
      // Optimistic update
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

      for await (const chunk of result) {
         const c = chunk as GenerateContentResponse;
         const text = c.text;
         if (text) {
            botResponseText += text;
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].text = botResponseText;
                return newArr;
            });
         }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Извините, произошла ошибка связи с AI.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 overflow-hidden shadow-lg">
      <div className="bg-primary p-4 text-white flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <h3 className="font-semibold">TechFlow AI Ассистент</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900/50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p>Задайте мне вопрос о наших услугах или технологиях!</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Спросите что-нибудь..."
            className="flex-1 bg-gray-100 dark:bg-slate-900 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-blue-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;