import React, { useState } from 'react';
import { editImage } from '../../services/geminiService';
import Button from '../Button';
import { Wand2, Upload, Loader2, ArrowRight } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSourcePreview(reader.result as string);
      reader.readAsDataURL(file);
      setResultImage(null);
    }
  };

  const handleEdit = async () => {
    if (!selectedFile || !prompt.trim()) return;

    setIsLoading(true);
    try {
      const { imageUrl } = await editImage(selectedFile, prompt);
      if (imageUrl) {
        setResultImage(imageUrl);
      } else {
        alert("Модель не вернула изображение. Попробуйте изменить запрос.");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при редактировании.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="text-secondary" /> 
          AI Редактор
        </h3>
        <p className="text-sm text-gray-500 mt-1">Измените изображение с помощью текстовых команд.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Input Area */}
          <div className="space-y-4">
            <label className="block w-full h-48 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900/50 relative overflow-hidden">
               {sourcePreview ? (
                <img src={sourcePreview} alt="Source" className="w-full h-full object-contain" />
               ) : (
                <div className="text-center text-gray-400">
                   <Upload className="w-8 h-8 mx-auto mb-2" />
                   <span>Исходное фото</span>
                </div>
               )}
               <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Пример: Добавь ретро фильтр..."
              className="w-full bg-gray-100 dark:bg-slate-900 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>

          {/* Arrow only on desktop */}
          <div className="hidden md:flex justify-center text-gray-300 dark:text-slate-600">
             <ArrowRight className="w-8 h-8" />
          </div>

          {/* Output Area */}
          <div className="w-full h-48 md:h-64 bg-gray-100 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative">
            {isLoading ? (
               <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            ) : resultImage ? (
               <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
            ) : (
               <span className="text-gray-400 text-sm">Результат появится здесь</span>
            )}
          </div>
        </div>

        <Button 
          onClick={handleEdit} 
          variant="secondary" 
          fullWidth 
          disabled={!selectedFile || !prompt.trim() || isLoading}
        >
          {isLoading ? 'Генерация...' : 'Применить изменения'}
        </Button>
      </div>
    </div>
  );
};

export default ImageEditor;