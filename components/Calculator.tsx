import React, { useState } from 'react';
import { QuizState } from '../types';
import { PRICING_PLANS, ADDITIONAL_COSTS } from '../constants';
import Button from './Button';
import { 
  Check, ChevronRight, RefreshCw, Layout, 
  ShoppingBag, ServerCog, Sparkles, Palette, 
  MessageSquare, HardDrive, 
  Calculator as CalcIcon 
} from 'lucide-react';

interface CalculatorProps {
  onResult?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onResult }) => {
  const initialState: QuizState = {
    step: 1,
    projectType: null,
    pages: 1,
    hasDesign: null,
    features: [],
  };

  const [state, setState] = useState<QuizState>(initialState);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  const isWebService = ['landing', 'shop', 'system'].includes(state.projectType || '');

  const calculateCost = () => {
    const typeMapping: Record<string, string> = {
      'landing': 'Landing Page',
      'shop': 'Интернет-Магазин',
      'system': 'Информационная Система',
      'bot': 'Чат-боты & AI',
      'server': 'Настройка серверов',
      'custom': 'Разовые задачи'
    };

    const planTitle = typeMapping[state.projectType || ''];
    const plan = PRICING_PLANS.find(p => p.title === planTitle);
    const base = plan ? plan.basePrice : 0;

    let total = base;

    if (isWebService) {
      if (state.hasDesign === false) {
        total += ADDITIONAL_COSTS.designPerPage * 2;
      }
      state.features.forEach(f => {
        if (f === 'PWA-приложение') total += ADDITIONAL_COSTS.pwa;
        else if (f.includes('AI')) total += ADDITIONAL_COSTS.aiIntegration;
        else total += ADDITIONAL_COSTS.feature;
      });
    } else if (state.projectType === 'bot') {
      state.features.forEach(f => {
        if (f.includes('AI')) total += ADDITIONAL_COSTS.aiIntegration;
        else total += ADDITIONAL_COSTS.botPlatform;
      });
    } else if (state.projectType === 'server') {
      state.features.forEach(f => {
        if (f.includes('Отказоустойчивость')) total += ADDITIONAL_COSTS.highAvailability;
        else if (f.includes('СУБД')) total += ADDITIONAL_COSTS.dbSetup;
        else total += ADDITIONAL_COSTS.backupConfig;
      });
    } else if (state.projectType === 'custom') {
      total += state.features.length * 3000;
    }

    return total;
  };

  const handleNext = () => {
    if (state.step === 2) {
      setEstimatedCost(calculateCost());
      if (onResult) onResult();
    }
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const reset = () => {
    setState(initialState);
    setEstimatedCost(0);
  };

  const projectTypes = [
    { id: 'landing', label: 'Landing Page', icon: Layout, desc: 'Промо-сайт' },
    { id: 'shop', label: 'Магазин', icon: ShoppingBag, desc: 'Каталог, оплата' },
    { id: 'system', label: 'Сложная система', icon: ServerCog, desc: 'Сервисы, Порталы, ИС' },
    { id: 'bot', label: 'Чат-боты & AI', icon: MessageSquare, desc: 'Telegram, Автоматизация' },
    { id: 'server', label: 'Серверы', icon: HardDrive, desc: 'Linux, Безопасность' },
    { id: 'custom', label: 'Разовые задачи', icon: CalcIcon, desc: 'Правки, доработки, фиксы' }
  ];

  const getFeatures = () => {
    if (state.projectType === 'custom') {
      return [
        { id: 'ssl', label: 'SSL + HTTPS', desc: 'Безопасное соединение' },
        { id: 'bug', label: 'Исправление багов', desc: 'Устранение ошибок' },
        { id: 'feature', label: 'Новый функционал', desc: 'Добавление фич' },
        { id: 'seo', label: 'Базовое SEO', desc: 'Поисковая оптимизация' },
        { id: 'analytics', label: 'Аналитика', desc: 'Метрика, Google Analytics' }
      ];
    }
    if (state.projectType === 'bot') {
      return [
        { id: 'base_bot', label: 'Базовая логика', desc: 'Приветствие, меню, команды', isBase: true },
        { id: 'tg', label: 'Telegram Бот', desc: 'Основная платформа' },
        { id: 'vk', label: 'VK / WhatsApp', desc: 'Дополнительные каналы' },
        { id: 'ai', label: 'Интеграция с AI', desc: 'GPT, нейросети' }
      ];
    }
    if (state.projectType === 'server') {
      return [
        { id: 'base_os', label: 'Настройка ОС', desc: 'Linux, SSH, Users, Security', isBase: true },
        { id: 'base_env', label: 'Веб-окружение', desc: 'Nginx, Docker, Runtime', isBase: true },
        { id: 'db', label: 'Настройка СУБД', desc: 'PostgreSQL, MySQL, MongoDB' },
        { id: 'sec', label: 'Защита и Firewall', desc: 'Безопасность' },
        { id: 'back', label: 'Бэкапы', desc: 'Сохранность данных' },
        { id: 'ha', label: 'Отказоустойчивость', desc: 'Кластеры' },
        { id: 'mon', label: 'Мониторинг 24/7', desc: 'Grafana, Alerting' }
      ];
    }
    if (state.projectType === 'shop') {
      return [
        { id: 'base_shop', label: 'Базовый магазин', desc: 'Каталог, корзина, Тех. SEO', isBase: true },
        { id: 'payment', label: 'Онлайн оплата', desc: 'ЮKassa, Robokassa', isBase: true },
        { id: 'cabinet', label: 'Личный кабинет клиента', desc: 'Заказы, бонусы, профиль', isBase: true },
        { id: 'pwa', label: 'PWA-приложение', desc: 'Установка на телефон' },
        { id: 'bot_int', label: 'Интеграция с чат-ботами', desc: 'Синхронизация заказов и заявок' }
      ];
    }
    if (state.projectType === 'system') {
      return [
        { id: 'base_system', label: 'Ядро системы', desc: 'Сложная логика, API, Тех. SEO', isBase: true },
        { id: 'cabinet', label: 'Личный кабинет клиента', desc: 'Управление доступом, профиль', isBase: true },
        { id: 'pwa', label: 'PWA-приложение', desc: 'Установка на телефон' },
        { id: 'bot_int', label: 'Интеграция с чат-ботами', desc: 'Уведомления и поддержка' }
      ];
    }
    return [
      { id: 'base_web', label: 'Базовый движок', desc: 'Админка, формы, Техническое SEO', isBase: true },
      { id: 'payment', label: 'Онлайн оплата', desc: 'ЮKassa, Robokassa' },
      { id: 'cabinet', label: 'Личный кабинет клиента', desc: 'Заказы, бонусы, профиль' },
      { id: 'pwa', label: 'PWA-приложение', desc: 'Установка на телефон' },
      { id: 'bot_int', label: 'Интеграция с чат-ботами', desc: 'Автоматизация заявок' }
    ];
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Выберите тип проекта</h3>
                <p className="text-gray-500 text-sm">Всего 2 шага до результата</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = state.projectType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setState(prev => ({ ...prev, projectType: type.id as any }))}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 group hover:shadow-md ${
                      isSelected 
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-4 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                    <span className="block font-bold mb-1 leading-tight">{type.label}</span>
                    <span className="text-xs text-gray-500">{type.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Настройка параметров</h3>
                <p className="text-gray-500 text-sm">Выберите необходимые опции</p>
            </div>

            {isWebService && (
              <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700 mb-6">
                <p className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Дизайн
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                     onClick={() => setState(prev => ({ ...prev, hasDesign: true }))}
                     className={`p-3 rounded-xl border-2 transition-all ${
                         state.hasDesign === true ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200'
                     }`}
                  >
                    <div className="font-bold">Есть макет</div>
                  </button>
                  <button 
                     onClick={() => setState(prev => ({ ...prev, hasDesign: false }))}
                     className={`p-3 rounded-xl border-2 transition-all ${
                         state.hasDesign === false ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200'
                     }`}
                  >
                    <div className="font-bold">Нужен дизайн</div>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              {getFeatures().map(feature => {
                 // @ts-ignore
                 const isBase = feature.isBase;
                 const isSelected = isBase || state.features.includes(feature.label);
                 return (
                    <div 
                      key={feature.id}
                      onClick={() => {
                        if (isBase) return;
                        const exists = state.features.includes(feature.label);
                        setState(prev => ({
                          ...prev,
                          features: exists ? prev.features.filter(f => f !== feature.label) : [...prev.features, feature.label]
                        }))
                      }}
                      className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                          isBase ? 'border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10 cursor-default' :
                          isSelected ? 'border-primary bg-blue-50 dark:bg-blue-900/20 cursor-pointer' : 
                          'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900/50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                            isBase ? 'bg-emerald-500 border-emerald-500' :
                            isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                        }`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                            <span className="font-medium block text-sm">
                                {feature.label} {isBase && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded ml-2 font-bold uppercase tracking-wider italic">включено</span>}
                            </span>
                            <span className="text-xs text-gray-400">{feature.desc}</span>
                        </div>
                      </div>
                    </div>
                 );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fadeIn py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Расчет готов!</h3>
            <p className="text-gray-500 mb-8">Ориентировочная стоимость проекта</p>
            
            <div className="text-5xl font-bold text-primary mb-12">
              {estimatedCost.toLocaleString('ru-RU')} ₽
            </div>
            
            <Button onClick={reset} variant="outline" className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto">
              <RefreshCw className="w-4 h-4" /> Рассчитать заново
            </Button>
            <p className="text-xs text-gray-400 mt-6">
                Не является публичной офертой. Стоимость уточняется после уточнения всех деталей.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    if (state.step === 1 && !state.projectType) return false;
    if (state.step === 2 && isWebService && state.hasDesign === null) return false;
    return true;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-4xl mx-auto border border-gray-100 dark:border-slate-700 relative overflow-hidden">
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
                    {state.step < 3 && <span className="text-xs text-gray-400">Шаг {state.step} из 2</span>}
                </div>
            </div>
          </div>

          <div className="min-h-[350px]">
            {renderStep()}
          </div>

          {state.step < 3 && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
               {state.step > 1 && (
                  <button 
                    onClick={() => setState(prev => ({...prev, step: prev.step - 1}))}
                    className="text-gray-500 font-medium px-4 py-2"
                  >
                      Назад
                  </button>
               )}
               <div className={state.step === 1 ? 'ml-auto' : ''}>
                    <Button 
                        onClick={handleNext} 
                        disabled={!canProceed()}
                        className="flex items-center gap-2"
                    >
                        {state.step === 2 ? 'Рассчитать' : 'Далее'} <ChevronRight className="w-4 h-4" />
                    </Button>
               </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Calculator;