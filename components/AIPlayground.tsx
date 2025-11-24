import React, { useState } from 'react';
import ChatBot from './ai/ChatBot';
import ImageAnalyzer from './ai/ImageAnalyzer';
import ImageEditor from './ai/ImageEditor';
import { Sparkles } from 'lucide-react';

const AIPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'analyze' | 'edit'>('chat');

  return (
    <section id="ai-lab" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-primary px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 mb-4">
            <Sparkles className="w-4 h-4" /> AI Лаборатория
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Интеллектуальные Инструменты</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             Попробуйте возможности нейросетей Gemini, которые мы можем интегрировать в ваши проекты.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
           {[
             { id: 'chat', label: 'AI Чат-бот' },
             { id: 'analyze', label: 'Анализ Изображений' },
             { id: 'edit', label: 'Редактор Фото' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`px-6 py-2 rounded-full font-medium transition-all ${
                 activeTab === tab.id 
                 ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                 : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
               }`}
             >
               {tab.label}
             </button>
           ))}
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'chat' && <ChatBot />}
          {activeTab === 'analyze' && <ImageAnalyzer />}
          {activeTab === 'edit' && <ImageEditor />}
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;