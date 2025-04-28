'use client';

import React, { useState, FormEvent, MouseEvent } from 'react';
import Image from 'next/image';
import SearchForm from './components/SearchForm';
import ParticlesBackground from './components/ParticlesBackground';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Destination {
  id: number;
  title: string;
  country: string;
  city: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  meals: string;
  description?: string;
  included?: string[];
  images?: string[];
  hotelName?: string;
  hotelRating?: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    title: 'Grand Resort & Spa',
    country: 'Турция',
    city: 'Анталья',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/158062669.jpg?k=0303a05b0b558b6750d43f0dce7a21bc9550fade3ecee45057f66455013d9d5d&o=&hp=1',
    price: '125 000 ₽',
    duration: '7 ночей',
    rating: 4.8,
    reviews: 256,
    meals: 'Все включено',
    description: 'Роскошный курортный комплекс на берегу Средиземного моря с собственным пляжем, спа-центром и великолепной территорией.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Питание All Inclusive', 'Страховка'],
    hotelName: 'Grand Resort & Spa',
    hotelRating: 5
  },
  {
    id: 2,
    title: 'Seaside Paradise',
    country: 'Турция',
    city: 'Белек',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9r6Ms4gM7U2z4mPYuI5MCgZi030d1WoSWg&s',
    price: '98 000 ₽',
    duration: '10 ночей',
    rating: 4.6,
    reviews: 189,
    meals: 'Завтрак и ужин',
    description: 'Уютный отель с прекрасным расположением у моря, великолепным пляжем и высоким уровнем сервиса.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Полупансион', 'Страховка'],
    hotelName: 'Seaside Paradise',
    hotelRating: 4
  },
  {
    id: 3,
    title: 'Marina Bay Resort',
    country: 'ОАЭ',
    city: 'Дубай',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhEWRQ1gaTwV8XT7Ads86YKdM0xJmoFLXTgw&s',
    price: '145 000 ₽',
    duration: '7 ночей',
    rating: 4.9,
    reviews: 312,
    meals: 'Завтраки',
    description: 'Современный отель в сердце Дубай Марины с потрясающими видами на город и залив.',
    included: ['Перелет', 'VIP-трансфер', 'Проживание в отеле 5*', 'Завтраки', 'Страховка'],
    hotelName: 'Marina Bay Resort',
    hotelRating: 5
  },
  {
    id: 4,
    title: 'Royal Palm Resort',
    country: 'Египет',
    city: 'Шарм-эль-Шейх',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/365169778.jpg?k=53ac18429c00e4927e7728e99f4e3a3efac4a0a42ba84399dab4c950d1926dd3&o=&hp=1',
    price: '85 000 ₽',
    duration: '7 ночей',
    rating: 4.7,
    reviews: 245,
    meals: 'Все включено',
    description: 'Роскошный курорт на берегу Красного моря с собственным коралловым рифом.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Ultra All Inclusive', 'Страховка'],
    hotelName: 'Royal Palm Resort',
    hotelRating: 5
  },
  {
    id: 5,
    title: 'Tropical Paradise',
    country: 'Таиланд',
    city: 'Пхукет',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/571163715.jpg?k=8dcdc39c35b0442f9ffa187cc835f25a0a066cce36e0ff0a1b9d6a3ff1a2629a&o=&hp=1',
    price: '92 000 ₽',
    duration: '11 ночей',
    rating: 4.6,
    reviews: 278,
    meals: 'Завтраки',
    description: 'Тропический рай на берегу Андаманского моря с пышными садами и спа-центром.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Завтраки', 'Страховка'],
    hotelName: 'Tropical Paradise',
    hotelRating: 4
  },
  {
    id: 6,
    title: 'Maldives Dream',
    country: 'Мальдивы',
    city: 'Мале',
    image: 'https://moihottur.ru/uploads/images/countries/maldivy.jpg',
    price: '285 000 ₽',
    duration: '7 ночей',
    rating: 4.9,
    reviews: 156,
    meals: 'Все включено',
    description: 'Роскошный отдых в раю с виллами на воде и безупречным сервисом.',
    included: ['Перелет', 'Трансфер на гидросамолете', 'Вилла на воде 5*', 'Premium All Inclusive', 'Страховка'],
    hotelName: 'Maldives Dream',
    hotelRating: 5
  },
  {
    id: 7,
    title: 'Greek Paradise',
    country: 'Греция',
    city: 'Санторини',
    image: 'https://media.rsrv.me/img.php?hid=529230&pid=5310584&v=f',
    price: '125 000 ₽',
    duration: '8 ночей',
    rating: 4.7,
    reviews: 234,
    meals: 'Завтраки',
    description: 'Уникальный отель с видом на кальдеру и закаты Санторини.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 4*', 'Завтраки', 'Экскурсия', 'Страховка'],
    hotelName: 'Greek Paradise',
    hotelRating: 4
  },
  {
    id: 8,
    title: 'Bali Harmony',
    country: 'Индонезия',
    city: 'Бали',
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/64971004.jpg?k=faefd18ecb1c89a316c7a7d9a728f1528eca6396fa205214c9c4ca5d34c08b2f&o=',
    price: '135 000 ₽',
    duration: '12 ночей',
    rating: 4.8,
    reviews: 198,
    meals: 'Завтраки',
    description: 'Гармоничное сочетание традиционной балийской архитектуры и современного комфорта.',
    included: ['Перелет', 'Трансфер', 'Проживание в отеле 5*', 'Завтраки', 'Йога-классы', 'Страховка'],
    hotelName: 'Bali Harmony',
    hotelRating: 5
  }
];

const specialOffers = [
  {
    title: 'Раннее бронирование',
    description: 'Скидки до 40% на летний сезон',
    icon: '🌞'
  },
  {
    title: 'Горящие туры',
    description: 'Спецпредложения каждый день',
    icon: '🔥'
  },
  {
    title: 'Рассрочка 0%',
    description: 'Отдыхайте сейчас, платите потом',
    icon: '💳'
  }
];

export default function HomePage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <>
      <ParticlesBackground />
      
      {/* Hero секция */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Путешествия"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Найдите идеальный тур для отпуска
            </h1>
            <p className="text-xl text-white/90">
              Лучшие предложения от надежных туроператоров
            </p>
          </div>
          
          <SearchForm />
        </div>
      </section>

      {/* Специальные предложения */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{offer.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные направления */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Популярные направления</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  handleDestinationClick(destination);
                }}
                className="relative h-[300px] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-semibold">{destination.country}</h3>
                    <p className="text-lg opacity-90">{destination.duration}</p>
                    <p className="text-xl font-medium mt-2">{destination.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Лучшие цены</h3>
              <p className="text-gray-600">Гарантия самых выгодных предложений от ведущих туроператоров</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Надежность</h3>
              <p className="text-gray-600">Работаем только с проверенными партнерами и гарантируем безопасность</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Наши специалисты готовы помочь вам в любое время дня и ночи</p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setSelectedDestination(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <div className="relative h-[400px]">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    setSelectedDestination(null);
                  }}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
                >
                  ✕
                </button>
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
                    <p className="font-bold text-2xl text-primary">{selectedDestination.price}</p>
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
    </>
  );
} 