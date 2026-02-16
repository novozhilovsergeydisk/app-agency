import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

interface LegalPageProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, onBack, children }) => {
  return (
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100">
      <div className="max-w-none">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:underline mb-6 group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Вернуться назад
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8">{title}</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none 
          prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-gray-600 dark:prose-p:text-gray-300 
          prose-li:text-gray-600 dark:prose-li:text-gray-300">
          {children}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 text-sm text-gray-500 space-y-1">
          <p>Последнее обновление: 15 февраля 2026 г.</p>
          <p>ООО "ТелеПат", ИНН: 7707380751</p>
          <p>Адрес: 127055, Москва г., ул. Новослободская, д. 14/19, стр 8</p>
        </div>
        
        <div className="mt-10 md:hidden">
          <Button onClick={onBack} fullWidth>Закрыть</Button>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
