'use client';

import { Tour } from '../data/tours';
import Image from 'next/image';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={tour.imageUrl}
          alt={tour.hotelName}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-poppins font-semibold text-lg text-secondary">{tour.hotelName}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600">{tour.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span>{tour.country}, {tour.city}</span>
          <span className="mx-2">•</span>
          <span>{tour.nights} ночей</span>
          <span className="mx-2">•</span>
          <span>{tour.meals}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">{tour.price.toLocaleString()} ₽</span>
            <span className="text-sm text-gray-500 ml-1">за тур</span>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition duration-200">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
} 