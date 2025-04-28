'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  city: string;
  country: string;
}

const popularDestinations: Suggestion[] = [
  { city: 'Анталья', country: 'Турция' },
  { city: 'Дубай', country: 'ОАЭ' },
  { city: 'Пхукет', country: 'Таиланд' },
  { city: 'Мале', country: 'Мальдивы' },
  { city: 'Хургада', country: 'Египет' },
];

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const suggestionsVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    height: 'auto',
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.2 }
  }
};

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: 'Москва',
    to: '',
    departDate: '',
    returnDate: '',
    guests: '2',
    budget: [50000, 200000],
    nights: [7, 14]
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (formData.to.length > 1) {
      const filtered = popularDestinations.filter(
        dest => dest.city.toLowerCase().includes(formData.to.toLowerCase()) ||
                dest.country.toLowerCase().includes(formData.to.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.to]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Имитация загрузки
    setTimeout(() => {
      router.push('/search');
    }, 1500);
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="relative max-w-5xl mx-auto"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Откуда</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">Куда</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Страна или город"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                onFocus={() => setShowSuggestions(true)}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  variants={suggestionsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      className="px-4 py-2 cursor-pointer transition-colors"
                      onClick={() => {
                        setFormData({ ...formData, to: suggestion.city });
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="font-medium">{suggestion.city}</div>
                      <div className="text-sm text-gray-500">{suggestion.country}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Даты</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="date"
                  className="input-field pl-10"
                  value={formData.departDate}
                  onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="input-field pl-10"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Ночей</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="30"
                className="input-field w-20"
                value={formData.nights[0]}
                onChange={(e) => setFormData({
                  ...formData,
                  nights: [parseInt(e.target.value), formData.nights[1]]
                })}
              />
              <span className="text-gray-500">—</span>
              <input
                type="number"
                min="1"
                max="30"
                className="input-field w-20"
                value={formData.nights[1]}
                onChange={(e) => setFormData({
                  ...formData,
                  nights: [formData.nights[0], parseInt(e.target.value)]
                })}
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Гости</label>
            <select
              className="input-field pl-10"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                </option>
              ))}
            </select>
            <svg
              className="absolute left-3 top-[41px] w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Бюджет: {formData.budget[0].toLocaleString()} ₽ — {formData.budget[1].toLocaleString()} ₽
            </label>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={formData.budget[0]}
                onChange={(e) => setFormData({
                  ...formData,
                  budget: [parseInt(e.target.value), formData.budget[1]]
                })}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={formData.budget[1]}
                onChange={(e) => setFormData({
                  ...formData,
                  budget: [formData.budget[0], parseInt(e.target.value)]
                })}
                className="w-full"
              />
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          type="submit"
          className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div 
              className="flex items-center"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Поиск туров...
            </motion.div>
          ) : (
            'Найти туры'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
} 