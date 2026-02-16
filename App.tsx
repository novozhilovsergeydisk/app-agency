import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SERVICES, PORTFOLIO, PRICING_PLANS } from "./constants";
import Button from "./components/Button";
import Calculator from "./components/Calculator";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Consent from "./components/Consent";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowUp,
  Code,
  Server,
  Database,
  Check,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (e?.currentTarget) (e.currentTarget as HTMLElement).blur();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % PORTFOLIO.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (e?.currentTarget) (e.currentTarget as HTMLElement).blur();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + PORTFOLIO.length) % PORTFOLIO.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Intersection Observer for ScrollSpy
    const sections = ["services", "pricing", "calculator", "portfolio", "contacts"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim().length >= 2;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "message":
        return value.trim().length >= 10;
      case "phone":
        // Phone is optional, but if entered, should be reasonable length
        return value === "" || value.trim().length >= 10;
      default:
        return true;
    }
  };

  const getFieldError = (name: string) => {
    // @ts-ignore
    const value = formData[name];
    // @ts-ignore
    const isTouched = touched[name];

    if (!isTouched) return "";

    switch (name) {
      case "name":
        if (value.trim().length === 0) return "Пожалуйста, укажите ваше имя";
        if (value.trim().length < 2) return "Имя должно содержать минимум 2 символа";
        break;
      case "email":
        if (value.trim().length === 0) return "Пожалуйста, введите ваш Email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Некорректный формат Email адреса";
        break;
      case "message":
        if (value.trim().length === 0) return "Напишите хотя бы пару слов в сообщении";
        if (value.trim().length < 10) return "Сообщение слишком короткое (минимум 10 символов)";
        break;
      case "phone":
        if (value.trim().length > 0 && value.trim().length < 10) return "Введите минимум 10 цифр";
        break;
    }
    return "";
  };

  const getInputClass = (name: string) => {
    const baseClass =
      "bg-gray-50 dark:bg-slate-900 border p-4 rounded-lg outline-none focus:ring-2 transition-all w-full";
    // @ts-ignore
    const isTouched = touched[name];
    const error = getFieldError(name);

    if (!isTouched) return `${baseClass} border-transparent focus:ring-primary`;
    return error === ""
      ? `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500/20`
      : `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500/20`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation styles
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });

    // Manual validation check for all required fields
    const errors = {
      name: formData.name.trim().length < 2 ? "Ошибка" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "Ошибка" : "",
      message: formData.message.trim().length < 10 ? "Ошибка" : "",
      phone: (formData.phone.trim().length > 0 && formData.phone.trim().length < 10) ? "Ошибка" : ""
    };

    if (Object.values(errors).some(error => error !== "")) {
      toast.error("Пожалуйста, заполните все обязательные поля корректно");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "Заявка отправлена успешно! Мы свяжемся с вами в ближайшее время.",
        );
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTouched({ name: false, phone: false, email: false, message: false });
      } else {
        toast.error("Ошибка при отправке заявки. Попробуйте позже.");
      }
    } catch (error) {
      toast.error("Ошибка при отправке заявки. Проверьте соединение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setTouched({
      name: false,
      phone: false,
      email: false,
      message: false,
    });
    // Scroll to top of calculator
    setTimeout(() => {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800/50 transition-colors">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-primary">
            <Code className="w-8 h-8" />
            DevInfra
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6 text-sm font-medium">
              <button
                onClick={() => scrollToSection("services")}
                className={`transition-colors ${activeSection === "services" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className={`transition-colors ${activeSection === "pricing" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                Прайс
              </button>
              <button
                onClick={() => scrollToSection("calculator")}
                className={`transition-colors ${activeSection === "calculator" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className={`transition-colors ${activeSection === "portfolio" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                Портфолио
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className={`transition-colors ${activeSection === "contacts" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                Контакты
              </button>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800/50 py-4 px-4 shadow-xl absolute w-full">
            <nav className="flex flex-col gap-4 text-center">
              <button
                onClick={() => scrollToSection("services")}
                className={`py-2 rounded-lg ${activeSection === "services" ? "bg-blue-50 dark:bg-slate-800 text-primary font-bold" : "hover:bg-gray-50 dark:hover:bg-slate-800"}`}
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className={`py-2 rounded-lg ${activeSection === "pricing" ? "bg-blue-50 dark:bg-slate-800 text-primary font-bold" : "hover:bg-gray-50 dark:hover:bg-slate-800"}`}
              >
                Прайс
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className={`py-2 rounded-lg ${activeSection === "portfolio" ? "bg-blue-50 dark:bg-slate-800 text-primary font-bold" : "hover:bg-gray-50 dark:hover:bg-slate-800"}`}
              >
                Портфолио
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className={`py-2 rounded-lg ${activeSection === "contacts" ? "bg-blue-50 dark:bg-slate-800 text-primary font-bold" : "hover:bg-gray-50 dark:hover:bg-slate-800"}`}
              >
                Контакты
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 flex-1 flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/20 pointer-events-none -z-10" />
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Разрабатываем{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
                Будущее
              </span>{" "}
              Вашего Бизнеса
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Комплексные решения: от создания высоконагруженных веб-систем до
              настройки серверной инфраструктуры и баз данных.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection("calculator")}>
                Рассчитать стоимость
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("portfolio")}
              >
                Смотреть работы
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-slate-800/60">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-green-500">$ systemctl start nginx</div>
                <div className="text-blue-500">
                  ℹ Nginx service started successfully
                </div>
                <div className="text-gray-400"># Configuring Database...</div>
                <div className="text-yellow-500">
                  $ psql -U postgres -d main_db
                </div>
                <div className="text-slate-900 dark:text-slate-100">
                  postgres=# SELECT * FROM users WHERE active = true;
                </div>
                <div className="animate-pulse">_</div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши Услуги</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Полный цикл разработки и поддержки
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-800/60 group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon === "code" && <Code className="w-8 h-8" />}
                  {service.icon === "server" && <Server className="w-8 h-8" />}
                  {service.icon === "database" && (
                    <Database className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Прайс Лист</h2>
            <p className="text-gray-700 dark:text-gray-400">
              Прозрачное ценообразование для любого масштаба
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800/60 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 dark:hover:border-primary/30 group/plan"
              >
                <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                <div className="text-2xl font-bold text-primary mb-6">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    const message = `Тариф: ${plan.title}\nЦена: ${plan.price}\nУслуги:\n- ${plan.features.join("\n- ")}`;
                    setFormData((prev) => ({ ...prev, message }));
                    scrollToSection("contacts");
                  }}
                >
                  Заказать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section
        id="calculator"
        className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <Calculator 
            onResult={clearForm} 
            onSendRequest={(details) => {
              setFormData(prev => ({ ...prev, message: details }));
              scrollToSection("contacts");
            }}
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши Работы</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((item, index) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video focus:ring-4 focus:ring-primary outline-none"
                onClick={() => setSelectedImageIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImageIndex(index);
                  }
                }}
                aria-label={`Просмотреть проект: ${item.title}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative max-w-5xl w-full flex items-center justify-center group/modal">
            {/* Prev Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 md:-left-16 text-white/50 hover:text-white transition-colors p-2 z-10 hidden md:block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <div className="relative overflow-hidden rounded-xl shadow-2xl bg-slate-900 flex flex-col items-center">
              <img
                src={PORTFOLIO[selectedImageIndex].imageUrl}
                alt={PORTFOLIO[selectedImageIndex].title}
                className="max-w-full max-h-[80vh] object-contain animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-center">
                <h4 className="text-xl font-bold">{PORTFOLIO[selectedImageIndex].title}</h4>
                <p className="text-sm opacity-70">{PORTFOLIO[selectedImageIndex].category}</p>
                <div className="mt-2 text-xs opacity-50">
                  {selectedImageIndex + 1} / {PORTFOLIO.length}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 md:-right-16 text-white/50 hover:text-white transition-colors p-2 z-10 hidden md:block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            
            {/* Mobile Controls */}
            <div className="absolute bottom-[-60px] flex gap-8 md:hidden">
              <button
                onClick={handlePrevImage}
                className="bg-white/10 p-3 rounded-full text-white outline-none active:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="bg-white/10 p-3 rounded-full text-white outline-none active:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Contacts Section */}
      <section id="contacts" className="py-12 md:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с
              вами в течение 15 минут.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Form First */}
            <form
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800/60 space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleFormChange}
                    onBlur={handleBlur}
                    required
                    className={getInputClass("name")}
                  />
                  {getFieldError("name") && (
                    <p className="text-red-500 text-xs pl-1">{getFieldError("name")}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleFormChange}
                    onBlur={handleBlur}
                    className={getInputClass("phone")}
                  />
                  {getFieldError("phone") && (
                    <p className="text-red-500 text-xs pl-1">{getFieldError("phone")}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  onBlur={handleBlur}
                  required
                  className={getInputClass("email")}
                />
                {getFieldError("email") && (
                  <p className="text-red-500 text-xs pl-1">{getFieldError("email")}</p>
                )}
              </div>
              <div className="space-y-1">
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Опишите задачу..."
                  value={formData.message}
                  onChange={handleFormChange}
                  onBlur={handleBlur}
                  required
                  className={`${getInputClass("message")} resize-none`}
                ></textarea>
                {getFieldError("message") && (
                  <p className="text-red-500 text-xs pl-1">{getFieldError("message")}</p>
                )}
              </div>
              <Button
                id="submitRequest"
                fullWidth
                className="mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>

            {/* Contact Info Second */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800/60">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Телефон</p>
                  <p className="font-semibold">+7 (499) 519-00-78</p>
                  <p className="font-semibold">+7 (916) 346-54-07</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800/60">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold">info@dev-infra.ru</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800/60">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Офис</p>
                  <p className="font-semibold">
                    115533, Москва, БЦ «Нагатинский»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            © {new Date().getFullYear()} dev-infra.ru | Все права защищены.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6">
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setShowConsent(true)}
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
            >
              Согласие на обработку персональных данных
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPrivacyPolicy(false)}
          />
          <div className="relative bg-white dark:bg-dark w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowPrivacyPolicy(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />
          </div>
        </div>
      )}

      {/* Consent Modal */}
      {showConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConsent(false)}
          />
          <div className="relative bg-white dark:bg-dark w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowConsent(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <Consent onBack={() => setShowConsent(false)} />
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-xl transition-all duration-300 z-40 ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default App;
