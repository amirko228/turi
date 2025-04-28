'use client';

import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

interface BookedTour {
  id: number;
  title: string;
  country: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  price: number;
  contractNumber: string;
  hotelName: string;
  image: string;
}

interface Document {
  id: number;
  title: string;
  type: 'contract' | 'insurance' | 'visa';
  date: string;
  downloadUrl: string;
}

// Моковые данные для демонстрации
const mockBookings: BookedTour[] = [
  {
    id: 1,
    title: 'Grand Resort & Spa',
    country: 'Турция, Анталья',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    status: 'active',
    price: 125000,
    contractNumber: 'TR-2024-1234',
    hotelName: 'Grand Resort & Spa 5*',
    image: '/images/turkey.jpg'
  },
  {
    id: 2,
    title: 'Marina Bay Resort',
    country: 'ОАЭ, Дубай',
    startDate: '2024-05-10',
    endDate: '2024-05-17',
    status: 'completed',
    price: 156000,
    contractNumber: 'UAE-2024-5678',
    hotelName: 'Marina Bay Resort 5*',
    image: '/images/uae.jpg'
  }
];

const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'Договор TR-2024-1234',
    type: 'contract',
    date: '2024-02-20',
    downloadUrl: '/documents/contract-1234.pdf'
  },
  {
    id: 2,
    title: 'Страховка для тура в Турцию',
    type: 'insurance',
    date: '2024-02-20',
    downloadUrl: '/documents/insurance-1234.pdf'
  },
  {
    id: 3,
    title: 'Договор UAE-2024-5678',
    type: 'contract',
    date: '2024-01-15',
    downloadUrl: '/documents/contract-5678.pdf'
  },
  {
    id: 4,
    title: 'Виза ОАЭ',
    type: 'visa',
    date: '2024-01-20',
    downloadUrl: '/documents/visa-5678.pdf'
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'documents' | 'settings'>('bookings');
  const [selectedBooking, setSelectedBooking] = useState<BookedTour | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  const handleSaveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Настройки успешно сохранены!');
  };

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: BookedTour['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: BookedTour['status']) => {
    switch (status) {
      case 'active':
        return 'Активный';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
    }
  };

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'contract':
        return '📄';
      case 'insurance':
        return '🛡️';
      case 'visa':
        return '🛂';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Шапка профиля */}
        <div className="bg-primary p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/20">
              <Image
                src={user.avatar || '/images/avatar-placeholder.jpg'}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="opacity-90">{user.email}</p>
              <p className="text-sm opacity-75 mt-1">На сайте с января 2024</p>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <div className="border-b">
          <div className="flex gap-2 p-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Мои туры
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Документы
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Настройки
            </button>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6">
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Мои туры</h2>
              {mockBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-6"
                >
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={booking.image}
                      alt={booking.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{booking.title}</h3>
                        <p className="text-gray-600">{booking.country}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {booking.hotelName}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        {new Date(booking.startDate).toLocaleDateString('ru-RU')} -{' '}
                        {new Date(booking.endDate).toLocaleDateString('ru-RU')}
                      </span>
                      <span>№{booking.contractNumber}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-semibold">
                        {booking.price.toLocaleString()} ₽
                      </span>
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        Подробнее →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Мои документы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="bg-gray-50 rounded-xl p-4 flex items-center gap-4"
                  >
                    <span className="text-2xl">{getDocumentIcon(document.type)}</span>
                    <div className="flex-grow">
                      <h3 className="font-medium">{document.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(document.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <a
                      href={document.downloadUrl}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      download
                    >
                      Скачать
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Настройки профиля</h2>
              <form className="space-y-6 max-w-md" onSubmit={handleSaveSettings}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    defaultValue="+7 (999) 123-45-67"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    placeholder="Введите новый пароль"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Сохранить изменения
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно с деталями тура */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedBooking.image}
                  alt={selectedBooking.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedBooking.title}</h2>
                    <p className="text-gray-600">{selectedBooking.country}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {getStatusText(selectedBooking.status)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Информация о бронировании</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p>
                        <span className="text-gray-600">Номер договора:</span>{' '}
                        {selectedBooking.contractNumber}
                      </p>
                      <p>
                        <span className="text-gray-600">Даты тура:</span>{' '}
                        {new Date(selectedBooking.startDate).toLocaleDateString('ru-RU')} -{' '}
                        {new Date(selectedBooking.endDate).toLocaleDateString('ru-RU')}
                      </p>
                      <p>
                        <span className="text-gray-600">Отель:</span>{' '}
                        {selectedBooking.hotelName}
                      </p>
                      <p>
                        <span className="text-gray-600">Стоимость:</span>{' '}
                        {selectedBooking.price.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Документы</h3>
                    <div className="space-y-2">
                      {mockDocuments
                        .filter((doc) => doc.title.includes(selectedBooking.contractNumber))
                        .map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.downloadUrl}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            download
                          >
                            <span>{getDocumentIcon(doc.type)}</span>
                            <span className="flex-grow">{doc.title}</span>
                            <span className="text-primary">Скачать</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 