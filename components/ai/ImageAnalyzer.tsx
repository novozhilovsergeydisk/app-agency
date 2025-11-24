import React, { useState } from 'react';
import { analyzeImage } from '../../services/geminiService';
import Button from '../Button';
import { Upload, ScanEye, Loader2, AlertCircle } from 'lucide-react';

const ImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const analysis = await analyzeImage(
        selectedFile, 
        "Проанализируй это изображение детально. Если это скриншот сайта, опиши его дизайн и элементы. Если это схема инфраструктуры, опиши компоненты. Используй русский язык."
      );
      setResult(analysis);
    } catch (error) {
      console.error(error);
      setResult("Ошибка при анализе изображения.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <ScanEye className="text-primary" /> 
          Анализ Изображений
        </h3>
        <p className="text-sm text-gray-500 mt-1">Загрузите скриншот или схему для получения AI-описания.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block w-full h-64 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors relative overflow-hidden group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain z-10" />
              ) : (
                <div className="text-center p-4 text-gray-400 group-hover:text-primary transition-colors">
                   <Upload className="w-12 h-12 mx-auto mb-2" />
                   <span className="font-medium">Нажмите для загрузки</span>
                   <p className="text-xs mt-1">PNG, JPG</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-gray-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-700 overflow-y-auto max-h-64 min-h-[200px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-primary">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : result ? (
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{result}</p>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                  <p>Результат анализа появится здесь</p>
                </div>
              )}
            </div>
            
            <div className="mt-4">
               <Button onClick={handleAnalyze} disabled={!selectedFile || isLoading} fullWidth>
                 {isLoading ? 'Анализирую...' : 'Анализировать'}
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;