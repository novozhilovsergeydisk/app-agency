import React, { useState } from 'react';
import { QuizState } from '../types';
import Button from './Button';
import { 
  Check, ChevronRight, RefreshCw, Layout, Building2, 
  ShoppingBag, ServerCog, Sparkles, FileText, Palette, 
  Calculator as CalcIcon 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Calculator: React.FC = () => {
  const initialState: QuizState = {
    step: 1,
    projectType: null,
    pages: 1,
    hasDesign: null,
    features: [],
  };

  const [state, setState] = useState<QuizState>(initialState);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  const calculateCost = () => {
    let base = 0;
    switch (state.projectType) {
      case 'landing': base = 20000; break;
      case 'corp': base = 50000; break;
      case 'shop': base = 100000; break;
      case 'system': base = 200000; break;
    }

    const pagesCost = (state.pages - 1) * 3000;
    const designCost = state.hasDesign === false ? (state.pages * 5000) : 0; 
    const featuresCost = state.features.length * 10000;

    return base + pagesCost + designCost + featuresCost;
  };

  const handleNext = () => {
    if (state.step === 4) {
      setEstimatedCost(calculateCost());
    }
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const reset = () => {
    setState(initialState);
    setEstimatedCost(0);
  };

  const projectTypes = [
    { id: 'landing', label: 'Landing Page', icon: Layout, desc: 'Одностраничный промо-сайт' },
    { id: 'corp', label: 'Корпоративный', icon: Building2, desc: 'Сайт компании, услуги' },
    { id: 'shop', label: 'Интернет-магазин', icon: ShoppingBag, desc: 'Каталог, корзина, оплата' },
    { id: 'system', label: 'Веб-сервис / ИС', icon: ServerCog, desc: 'Личные кабинеты, API' }
  ];

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Выберите тип проекта</h3>
                <p className="text-gray-500 text-sm">С чего начнем разработку?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = state.projectType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setState(prev => ({ ...prev, projectType: type.id as any }))}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 group hover:shadow-md ${
                      isSelected 
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800' 
                      : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                        isSelected ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 group-hover:text-primary'
                    }`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="block font-bold text-lg mb-1">{type.label}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{type.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-fadeIn">
             <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Основные параметры</h3>
                <p className="text-gray-500 text-sm">Настройте объем работ</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <label className="font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Количество страниц
                    </label>
                    <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-md shadow-sm font-bold text-primary border border-gray-100 dark:border-slate-700">
                        {state.pages}
                    </span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={state.pages} 
                    onChange={(e) => setState(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1</span>
                    <span>50</span>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
              <p className="font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-secondary" />
                Дизайн проект
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                   onClick={() => setState(prev => ({ ...prev, hasDesign: true }))}
                   className={`p-4 rounded-xl border-2 transition-all ${
                       state.hasDesign === true 
                       ? 'border-secondary bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                       : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                   }`}
                >
                  <div className="font-bold">Есть макет</div>
                  <div className="text-xs opacity-70 mt-1">Figma, Sketch, PSD</div>
                </button>
                <button 
                   onClick={() => setState(prev => ({ ...prev, hasDesign: false }))}
                   className={`p-4 rounded-xl border-2 transition-all ${
                       state.hasDesign === false 
                       ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' 
                       : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                   }`}
                >
                  <div className="font-bold">Нужен дизайн</div>
                  <div className="text-xs opacity-70 mt-1">Разработка с нуля</div>
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Функционал</h3>
                <p className="text-gray-500 text-sm">Выберите дополнительные модули</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'crm', label: 'Интеграция с CRM', desc: 'Bitrix24, AmoCRM' },
                { id: 'payment', label: 'Онлайн оплата', desc: 'ЮKassa, Robokassa' },
                { id: 'cabinet', label: 'Личный кабинет', desc: 'Регистрация, история заказов' },
                { id: 'lang', label: 'Мультиязычность', desc: 'Перевод интерфейса' },
                { id: 'seo', label: 'SEO оптимизация', desc: 'Базовая настройка для поиска' }
              ].map(feature => {
                 const isSelected = state.features.includes(feature.label); // Note: using label as ID in state currently
                 return (
                    <div 
                      key={feature.id}
                      onClick={() => {
                        const exists = state.features.includes(feature.label);
                        setState(prev => ({
                          ...prev,
                          features: exists ? prev.features.filter(f => f !== feature.label) : [...prev.features, feature.label]
                        }))
                      }}
                      className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                          isSelected 
                          ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                          : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                            isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                        }`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                            <span className="font-medium block">{feature.label}</span>
                            <span className="text-xs text-gray-400">{feature.desc}</span>
                        </div>
                      </div>
                    </div>
                 );
              })}
            </div>
          </div>
        );
      case 4: // Summary Step
        const selectedType = projectTypes.find(t => t.id === state.projectType);
        return (
           <div className="space-y-6 animate-fadeIn">
               <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Проверьте данные</h3>
                    <p className="text-gray-500 text-sm">Мы готовы рассчитать стоимость</p>
               </div>
               
               <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 space-y-4 border border-gray-100 dark:border-slate-700">
                   <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
                       <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm text-primary">
                               {selectedType && <selectedType.icon className="w-5 h-5" />}
                           </div>
                           <div>
                               <p className="text-xs text-gray-400">Тип проекта</p>
                               <p className="font-bold">{selectedType?.label}</p>
                           </div>
                       </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                       <div>
                           <p className="text-xs text-gray-400">Страниц</p>
                           <p className="font-medium">{state.pages}</p>
                       </div>
                       <div>
                           <p className="text-xs text-gray-400">Дизайн</p>
                           <p className="font-medium">{state.hasDesign ? 'Готовый макет' : 'Требуется'}</p>
                       </div>
                   </div>

                   <div>
                       <p className="text-xs text-gray-400 mb-2">Дополнительно</p>
                       {state.features.length > 0 ? (
                           <div className="flex flex-wrap gap-2">
                               {state.features.map(f => (
                                   <span key={f} className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded border border-gray-200 dark:border-slate-700">
                                       {f}
                                   </span>
                               ))}
                           </div>
                       ) : (
                           <p className="text-sm italic text-gray-400">Без дополнительных функций</p>
                       )}
                   </div>
               </div>
           </div>
        );
      case 5: // Result
        const data = [
          { name: 'Базовая стоимость', value: estimatedCost * 0.4 },
          { name: 'Дизайн', value: estimatedCost * 0.25 },
          { name: 'Разработка', value: estimatedCost * 0.35 },
        ];
        const COLORS = ['#3b82f6', '#10b981', '#6366f1'];

        return (
          <div className="text-center animate-fadeIn py-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Расчет готов!</h3>
            <p className="text-gray-500 mb-6">Ориентировочная стоимость проекта</p>
            
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mb-8">
              {estimatedCost.toLocaleString('ru-RU')} ₽
            </div>
            
            <div className="h-48 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col gap-3">
                <Button onClick={reset} variant="outline" className="flex items-center justify-center gap-2 w-full">
                <RefreshCw className="w-4 h-4" /> Рассчитать заново
                </Button>
                <p className="text-xs text-gray-400 mt-2">
                    Не является публичной офертой. Стоимость может измениться после составления ТЗ.
                </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    if (state.step === 1 && !state.projectType) return false;
    if (state.step === 2 && state.hasDesign === null) return false;
    return true;
  };

  const progress = Math.min((state.step / 5) * 100, 100);

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-3xl mx-auto border border-gray-100 dark:border-slate-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <CalcIcon className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Калькулятор
                    </h2>
                    {state.step < 5 && <span className="text-xs text-gray-400">Шаг {state.step} из 4</span>}
                </div>
            </div>
          </div>

          {state.step < 5 && (
            <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mb-8 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(state.step / 4) * 100}%` }}
                />
            </div>
          )}

          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          {state.step < 5 && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
               {state.step > 1 && (
                  <button 
                    onClick={() => setState(prev => ({...prev, step: prev.step - 1}))}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-medium px-4 py-2 transition-colors"
                  >
                      Назад
                  </button>
               )}
               <div className={state.step === 1 ? 'ml-auto' : ''}>
                    <Button 
                        onClick={handleNext} 
                        disabled={!canProceed()}
                        className="flex items-center gap-2 pl-8 pr-6 shadow-xl shadow-blue-500/20"
                    >
                        {state.step === 4 ? 'Рассчитать стоимость' : 'Далее'} <ChevronRight className="w-4 h-4" />
                    </Button>
               </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Calculator;