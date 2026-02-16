import { Service, PortfolioItem, PricingPlan } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Разработка Сайтов',
    description: 'Создание современных, адаптивных сайтов и веб-приложений любой сложности.',
    icon: 'code'
  },
  {
    id: 'server',
    title: 'Серверная Инфраструктура',
    description: 'Настройка и администрирование Linux серверов (Debian, Ubuntu, CentOS).',
    icon: 'server'
  },
  {
    id: 'db',
    title: 'Настройка СУБД',
    description: 'Проектирование и оптимизация баз данных PostgreSQL, MySQL, MariaDB.',
    icon: 'database'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Телемедицинский сервис для медорганизаций',
    category: 'medsenger.ru',
    imageUrl: '/images/pfolio-1.png'
  },
  {
    id: '2',
    title: 'Услуги врача-остеопата',
    category: 'osteovrach.ru',
    imageUrl: '/images/pfolio-2.png'
  },
  {
    id: '3',
    title: 'Тур-оператор',
    category: 'slavhol.ru',
    imageUrl: '/images/pfolio-3.png'
  },
  {
    id: '4',
    title: 'Детский медицинский сервис',
    category: 'kidsrehab.online',
    imageUrl: '/images/pfolio-4.png'
  },
  {
    id: '5',
    title: 'Система управления заявками',
    category: 'lan-install.online',
    imageUrl: '/images/pfolio-5.png'
  },
  {
    id: '6',
    title: 'Груминг-салон',
    category: 'salon-groom.ru',
    imageUrl: '/images/pfolio-6.png'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Landing Page',
    price: 'от 10 000 ₽',
    basePrice: 10000,
    features: ['1 страница', 'Адаптивный дизайн', 'Форма заявки', 'Базовая SEO']
  },
  {
    title: 'Интернет-Магазин',
    price: 'от 70 000 ₽',
    basePrice: 70000,
    features: ['Каталог товаров', 'Корзина и оплата', 'Личный кабинет', 'Интеграция с 1С']
  },
  {
    title: 'Информационная Система',
    price: 'от 100 000 ₽',
    basePrice: 100000,
    features: ['Сложная логика', 'Личные кабинеты', 'Интеграции по API', 'Высокая нагрузка']
  },
  {
    title: 'Чат-боты & AI',
    price: 'от 5 000 ₽',
    basePrice: 5000,
    features: ['Telegram/VK/WhatsApp', 'Интеграция с ИИ', 'Автоматизация продаж', 'Сбор заявок']
  },
  {
    title: 'Настройка серверов',
    price: 'от 10 000 ₽',
    basePrice: 10000,
    features: ['Linux (Debian/Ubuntu)', 'Безопасность & Firewall', 'Docker & CI/CD', 'Мониторинг 24/7']
  },
  {
    title: 'Разовые задачи',
    price: 'от 5 000 ₽',
    basePrice: 5000,
    features: ['SSL + HTTPS', 'Настройка аналитики', 'SEO-оптимизация', 'Исправление ошибок']
  }
];

export const ADDITIONAL_COSTS = {
  // Веб-сайты
  page: 1500,
  designPerPage: 2500,
  feature: 5000,
  pwa: 10000,
  // Чат-боты
  botPlatform: 3000, // За каждый доп. мессенджер
  aiIntegration: 7000, // Интеграция с GPT/LLM
  // Серверы
  backupConfig: 3000,
  highAvailability: 8000
};
