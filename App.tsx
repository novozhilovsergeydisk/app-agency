import React, { useState, useEffect } from 'react';
import { SERVICES, PORTFOLIO, PRICING_PLANS } from './constants';
import Button from './components/Button';
import Calculator from './components/Calculator';
import { 
  Menu, X, Moon, Sun, ArrowUp, Code, Server, Database, Check, Phone, Mail, MapPin, 
  Linkedin, Github, Twitter, Send 
} from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Заявка отправлена успешно!');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert('Ошибка при отправке заявки');
      }
    } catch (error) {
      alert('Ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-primary cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Code className="w-5 h-5" />
            </div>
            TechFlow
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6 text-sm font-medium">
              <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Прайс</button>
              <button onClick={() => scrollToSection('calculator')} className="hover:text-primary transition-colors">Калькулятор</button>
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">Портфолио</button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </nav>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-4 px-4 shadow-xl absolute w-full">
            <nav className="flex flex-col gap-4 text-center">
              <button onClick={() => scrollToSection('services')} className="py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Услуги</button>
              <button onClick={() => scrollToSection('pricing')} className="py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Прайс</button>
              <button onClick={() => scrollToSection('portfolio')} className="py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Портфолио</button>
              <button onClick={() => scrollToSection('contacts')} className="py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg">Контакты</button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 flex-1 flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/20 pointer-events-none -z-10" />
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Разрабатываем <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Будущее</span> Вашего Бизнеса
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Комплексные решения: от создания высоконагруженных веб-систем до настройки серверной инфраструктуры и баз данных.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('calculator')}>Рассчитать стоимость</Button>
              <Button variant="outline" onClick={() => scrollToSection('portfolio')}>Смотреть работы</Button>
            </div>
          </div>
          <div className="relative">
             <div className="relative z-10 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-slate-700">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-green-500">$ systemctl start nginx</div>
                  <div className="text-blue-500">ℹ Nginx service started successfully</div>
                  <div className="text-gray-400"># Configuring Database...</div>
                  <div className="text-yellow-500">$ psql -U postgres -d main_db</div>
                  <div className="text-slate-900 dark:text-slate-100">postgres=# SELECT * FROM users WHERE active = true;</div>
                  <div className="animate-pulse">_</div>
                </div>
             </div>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши Услуги</h2>
            <p className="text-gray-600 dark:text-gray-400">Полный цикл разработки и поддержки</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700 group">
                <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon === 'code' && <Code className="w-8 h-8" />}
                  {service.icon === 'server' && <Server className="w-8 h-8" />}
                  {service.icon === 'database' && <Database className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Прайс Лист</h2>
            <p className="text-gray-600 dark:text-gray-400">Прозрачное ценообразование для любого масштаба</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                <div className="text-2xl font-bold text-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" fullWidth>Заказать</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
           <Calculator />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши Работы</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map(item => (
              <div 
                key={item.id} 
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-sm opacity-80">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full view" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
          <button className="absolute top-4 right-4 text-white p-2">
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение 15 минут.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-semibold">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">hello@techflow.agency</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telegram</p>
                    <a href="https://t.me/techflow_agency" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">
                      @techflow_agency
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Офис</p>
                    <p className="font-semibold">Москва, ул. Пушкина, д. 10</p>
                  </div>
                </div>
              </div>
            </div>

             <form className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-4" onSubmit={handleSubmit}>
               <div className="grid grid-cols-2 gap-4">
                 <input
                   type="text"
                   name="name"
                   placeholder="Имя"
                   value={formData.name}
                   onChange={handleFormChange}
                   required
                   className="bg-gray-50 dark:bg-slate-900 border-none p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                 />
                 <input
                   type="text"
                   name="phone"
                   placeholder="Телефон"
                   value={formData.phone}
                   onChange={handleFormChange}
                   className="bg-gray-50 dark:bg-slate-900 border-none p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                 />
               </div>
               <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={formData.email}
                 onChange={handleFormChange}
                 required
                 className="w-full bg-gray-50 dark:bg-slate-900 border-none p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
               />
               <textarea
                 rows={4}
                 name="message"
                 placeholder="Опишите задачу..."
                 value={formData.message}
                 onChange={handleFormChange}
                 required
                 className="w-full bg-gray-50 dark:bg-slate-900 border-none p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary resize-none"
               ></textarea>
               <Button fullWidth className="mt-2" disabled={isSubmitting}>
                 {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
               </Button>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
             <Code className="w-6 h-6" /> TechFlow
          </div>
          <p className="text-gray-500 text-sm">© 2024 TechFlow Agency. Все права защищены.</p>
          <div className="flex gap-4">
             <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-xl transition-all duration-300 z-40 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;