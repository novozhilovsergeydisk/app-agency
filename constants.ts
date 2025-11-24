import { Service, PortfolioItem } from './types';

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
    title: 'E-commerce Платформа',
    category: 'Интернет-магазин',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Корпоративный Портал',
    category: 'Корпоративный сайт',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'CRM Система',
    category: 'Информационная система',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    title: 'Лендинг Конференции',
    category: 'Landing Page',
    imageUrl: 'https://picsum.photos/800/600?random=4'
  },
  {
    id: '5',
    title: 'Облачная Инфраструктура',
    category: 'DevOps',
    imageUrl: 'https://picsum.photos/800/600?random=5'
  },
  {
    id: '6',
    title: 'Аналитическая Панель',
    category: 'Dashboard',
    imageUrl: 'https://picsum.photos/800/600?random=6'
  }
];

export const PRICING_PLANS = [
  {
    title: 'Landing Page',
    price: 'от 30 000 ₽',
    features: ['1 страница', 'Адаптивный дизайн', 'Форма заявки', 'Базовая SEO']
  },
  {
    title: 'Корпоративный Сайт',
    price: 'от 80 000 ₽',
    features: ['до 10 страниц', 'Каталог услуг', 'Админ-панель', 'Новости/Блог']
  },
  {
    title: 'Интернет-Магазин',
    price: 'от 150 000 ₽',
    features: ['Каталог товаров', 'Корзина и оплата', 'Личный кабинет', 'Интеграция с 1С']
  },
  {
    title: 'Информационная Система',
    price: 'от 300 000 ₽',
    features: ['Сложная логика', 'Разграничение прав', 'API', 'Высокая нагрузка']
  }
];
