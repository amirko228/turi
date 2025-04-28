'use client';

import { hotel } from '../../data/hotel';
import ImageSlider from '../../components/ImageSlider';
import AmenitiesList from '../../components/AmenitiesList';
import ReviewsList from '../../components/ReviewsList';

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Слайдер с фотографиями */}
        <div className="mb-8">
          <ImageSlider images={hotel.images} />
        </div>

        {/* Информация об отеле */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="font-poppins text-3xl font-bold text-secondary mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <span>{hotel.location.city}, {hotel.location.country}</span>
                    <span className="mx-2">•</span>
                    <span>{hotel.stars} ★</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {hotel.price.toLocaleString()} ₽
                  </div>
                  <div className="text-sm text-gray-500">за тур</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{hotel.description}</p>

              <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                Забронировать тур
              </button>
            </div>

            {/* Удобства */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <h2 className="font-poppins text-xl font-semibold text-secondary mb-4">
                Удобства отеля
              </h2>
              <AmenitiesList amenities={hotel.amenities} />
            </div>

            {/* Отзывы */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="font-poppins text-xl font-semibold text-secondary mb-4">
                Отзывы гостей
              </h2>
              <ReviewsList reviews={hotel.reviews} />
            </div>
          </div>

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-8">
              <h2 className="font-poppins text-xl font-semibold text-secondary mb-4">
                Забронировать тур
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата заезда
                  </label>
                  <input
                    type="date"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата выезда
                  </label>
                  <input
                    type="date"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Количество гостей
                  </label>
                  <select className="input-field">
                    <option value="1">1 гость</option>
                    <option value="2">2 гостя</option>
                    <option value="3">3 гостя</option>
                    <option value="4">4 гостя</option>
                  </select>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 