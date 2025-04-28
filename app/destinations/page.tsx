'use client';

import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Destination {
  id: number;
  title: string;
  country: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description?: string;
  included?: string[];
  images?: string[];
  hotelName?: string;
  hotelRating?: number;
  mealPlan: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    title: 'Grand Resort & Spa',
    country: 'Турция, Анталья',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/158062669.jpg?k=0303a05b0b558b6750d43f0dce7a21bc9550fade3ecee45057f66455013d9d5d&o=&hp=1',
    price: 125000,
    duration: '7 ночей',
    rating: 4.8,
    reviews: 256,
    mealPlan: 'Все включено',
    description: 'Роскошный курорт на берегу Средиземного моря с собственным пляжем, спа-центром и различными ресторанами. Идеальное место для семейного отдыха.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Питание All Inclusive', 'Страховка'],
    images: ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/158062669.jpg?k=0303a05b0b558b6750d43f0dce7a21bc9550fade3ecee45057f66455013d9d5d&o=&hp=1'],
    hotelName: 'Grand Resort & Spa',
    hotelRating: 5
  },
  {
    id: 2,
    title: 'Seaside Paradise',
    country: 'Турция, Белек',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9r6Ms4gM7U2z4mPYuI5MCgZi030d1WoSWg&s',
    price: 98000,
    duration: '10 ночей',
    rating: 4.6,
    reviews: 189,
    mealPlan: 'Завтрак и ужин',
    description: 'Уютный отель с прекрасным видом на море, большим бассейном и развитой инфраструктурой для активного отдыха.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Питание HB', 'Страховка'],
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9r6Ms4gM7U2z4mPYuI5MCgZi030d1WoSWg&s'],
    hotelName: 'Seaside Paradise',
    hotelRating: 4
  },
  {
    id: 3,
    title: 'Marina Bay Resort',
    country: 'ОАЭ, Дубай',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhEWRQ1gaTwV8XT7Ads86YKdM0xJmoFLXTgw&s',
    price: 156000,
    duration: '7 ночей',
    rating: 4.9,
    reviews: 312,
    mealPlan: 'Все включено',
    description: 'Роскошный отель в самом сердце Дубая с видом на знаменитый небоскреб Бурдж-Халифа. Высочайший уровень сервиса и незабываемые впечатления.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Питание All Inclusive', 'Страховка', 'Экскурсия по Дубаю'],
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhEWRQ1gaTwV8XT7Ads86YKdM0xJmoFLXTgw&s'],
    hotelName: 'Marina Bay Resort',
    hotelRating: 5
  },
  {
    id: 4,
    title: 'Royal Palm Resort',
    country: 'Египет, Шарм-эль-Шейх',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/365169778.jpg?k=53ac18429c00e4927e7728e99f4e3a3efac4a0a42ba84399dab4c950d1926dd3&o=&hp=1',
    price: 89000,
    duration: '7 ночей',
    rating: 4.7,
    reviews: 245,
    mealPlan: 'Все включено',
    description: 'Великолепный отель на берегу Красного моря с собственным коралловым рифом. Идеальное место для любителей снорклинга и дайвинга.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Питание All Inclusive', 'Страховка', 'Дайвинг-центр'],
    images: ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/365169778.jpg?k=53ac18429c00e4927e7728e99f4e3a3efac4a0a42ba84399dab4c950d1926dd3&o=&hp=1'],
    hotelName: 'Royal Palm Resort',
    hotelRating: 5
  },
  {
    id: 5,
    title: 'Tropical Paradise',
    country: 'Таиланд, Пхукет',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/571163715.jpg?k=8dcdc39c35b0442f9ffa187cc835f25a0a066cce36e0ff0a1b9d6a3ff1a2629a&o=&hp=1',
    price: 112000,
    duration: '11 ночей',
    rating: 4.5,
    reviews: 178,
    mealPlan: 'Завтрак',
    description: 'Уютный отель в тропическом раю с белоснежным пляжем и кристально чистой водой. Традиционный тайский сервис и незабываемая атмосфера.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Завтраки', 'Страховка', 'Массаж в подарок'],
    images: ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/571163715.jpg?k=8dcdc39c35b0442f9ffa187cc835f25a0a066cce36e0ff0a1b9d6a3ff1a2629a&o=&hp=1'],
    hotelName: 'Tropical Paradise',
    hotelRating: 4
  },
  {
    id: 6,
    title: 'Maldives Dream',
    country: 'Мальдивы, Мале',
    image: 'https://moihottur.ru/uploads/images/countries/maldivy.jpg',
    price: 245000,
    duration: '7 ночей',
    rating: 4.9,
    reviews: 156,
    mealPlan: 'Все включено',
    description: 'Роскошные виллы на воде с собственным бассейном и прямым выходом к океану. Непревзойденный сервис и полное уединение.',
    included: ['Перелет', 'Трансфер на гидросамолете', 'Проживание в вилле 5*', 'Питание All Inclusive', 'Страховка', 'Спа-процедуры'],
    images: ['https://moihottur.ru/uploads/images/countries/maldivy.jpg'],
    hotelName: 'Maldives Dream Resort',
    hotelRating: 5
  },
  {
    id: 7,
    title: 'Greek Paradise',
    country: 'Греция, Санторини',
    image: 'https://media.rsrv.me/img.php?hid=529230&pid=5310584&v=f',
    price: 135000,
    duration: '7 ночей',
    rating: 4.7,
    reviews: 203,
    mealPlan: 'Завтрак и ужин',
    description: 'Уникальный отель в традиционном греческом стиле с потрясающим видом на Эгейское море и знаменитый закат Санторини.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Питание HB', 'Страховка', 'Экскурсия по острову'],
    images: ['https://media.rsrv.me/img.php?hid=529230&pid=5310584&v=f'],
    hotelName: 'Greek Paradise Resort',
    hotelRating: 4
  },
  {
    id: 8,
    title: 'Bali Harmony',
    country: 'Индонезия, Бали',
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/64971004.jpg?k=faefd18ecb1c89a316c7a7d9a728f1528eca6396fa205214c9c4ca5d34c08b2f&o=',
    price: 168000,
    duration: '10 ночей',
    rating: 4.8,
    reviews: 167,
    mealPlan: 'Завтрак',
    description: 'Эксклюзивный курорт в сердце тропических джунглей Бали. Виллы с частными бассейнами, спа-центр и йога-студия.',
    included: ['Перелет', 'Трансфер', 'Проживание в вилле 5*', 'Завтраки', 'Страховка', 'Йога-классы'],
    images: ['https://q-xx.bstatic.com/xdata/images/hotel/max500/64971004.jpg?k=faefd18ecb1c89a316c7a7d9a728f1528eca6396fa205214c9c4ca5d34c08b2f&o='],
    hotelName: 'Bali Harmony Resort',
    hotelRating: 5
  }
];

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 200000,
    rating: 'Любой рейтинг',
    hotelClass: 'Любая категория'
  });

  const handlePrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedDestination?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedDestination.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedDestination?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedDestination.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setCurrentImageIndex(0);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    let filtered = destinations;

    // Фильтрация по цене
    filtered = filtered.filter(dest => 
      dest.price >= filters.minPrice && dest.price <= filters.maxPrice
    );

    // Фильтрация по рейтингу
    if (filters.rating !== 'Любой рейтинг') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(dest => dest.rating >= minRating);
    }

    // Фильтрация по классу отеля
    if (filters.hotelClass !== 'Любая категория') {
      const stars = parseInt(filters.hotelClass);
      filtered = filtered.filter(dest => dest.hotelRating === stars);
    }

    setFilteredDestinations(filtered);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Фильтры */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Фильтры</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Цена</h3>
                <div className="space-y-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="От"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="До"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Рейтинг</h3>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>Любой рейтинг</option>
                  <option>4.0</option>
                  <option>4.5</option>
                  <option>4.8</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-3">Звезды отеля</h3>
                <select
                  name="hotelClass"
                  value={filters.hotelClass}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>Любая категория</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Список туров */}
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-6">Найдено {filteredDestinations.length} туров</h1>
          
          <div className="space-y-6">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  <div className="relative w-96 cursor-pointer" onClick={(e: MouseEvent) => handleDestinationClick(destination)}>
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      width={384}
                      height={256}
                      className="object-cover h-64"
                    />
                  </div>
                  <div className="flex-grow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold mb-1">{destination.title}</h2>
                        <p className="text-gray-600">{destination.country}</p>
                      </div>
                      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-medium">{destination.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({destination.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>🕒 {destination.duration}</span>
                      <span>🍽 {destination.mealPlan}</span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-600 text-sm">Стоимость за тур</p>
                        <p className="text-2xl font-bold text-primary">{destination.price.toLocaleString()} ₽</p>
                      </div>
                      <button
                        onClick={(e: MouseEvent) => handleDestinationClick(destination)}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={(e: MouseEvent) => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <div className="relative h-[400px]">
                {selectedDestination.images && (
                  <Image
                    src={selectedDestination.images[currentImageIndex]}
                    alt={selectedDestination.title}
                    fill
                    className="object-cover"
                  />
                )}
                <button
                  onClick={(e: MouseEvent) => setSelectedDestination(null)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
                >
                  ✕
                </button>
                {selectedDestination.images && selectedDestination.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-md hover:bg-white transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-md hover:bg-white transition-colors"
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedDestination.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedDestination.title}</h2>
                    <p className="text-gray-600 text-lg">{selectedDestination.country}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="font-medium">{selectedDestination.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({selectedDestination.reviews})</span>
                  </div>
                </div>

                {selectedDestination.hotelName && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Отель</h3>
                    <div className="flex justify-between items-center">
                      <span>{selectedDestination.hotelName}</span>
                      <div className="flex items-center">
                        {Array.from({ length: selectedDestination.hotelRating || 0 }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-gray-700 mb-6">{selectedDestination.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">В стоимость включено:</h3>
                  <ul className="space-y-2">
                    {selectedDestination.included?.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-gray-600">Длительность:</p>
                    <p className="font-semibold text-lg">{selectedDestination.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Стоимость:</p>
                    <p className="font-bold text-2xl text-primary">{selectedDestination.price.toLocaleString()} ₽</p>
                  </div>
                </div>

                <Link
                  href={`/booking/${selectedDestination.id}`}
                  className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 text-center"
                >
                  Забронировать
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 