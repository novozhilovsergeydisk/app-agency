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
