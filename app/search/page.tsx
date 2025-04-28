'use client';

import { useState } from 'react';
import { tours } from '../data/tours';
import TourCard from '../components/TourCard';
import Filters from '../components/Filters';

export default function SearchResults() {
  const [filteredTours, setFilteredTours] = useState(tours);

  const handleFilterChange = (filters: {
    priceRange: [number, number];
    rating: number;
    stars: number;
  }) => {
    const { priceRange, rating, stars } = filters;
    
    const filtered = tours.filter(tour => {
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      const ratingMatch = rating === 0 || tour.rating >= rating;
      const starsMatch = stars === 0 || tour.stars === stars;
      
      return priceMatch && ratingMatch && starsMatch;
    });

    setFilteredTours(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Фильтры */}
          <div className="lg:w-1/4">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Список туров */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="font-poppins text-2xl font-bold text-secondary">
                Найдено {filteredTours.length} туров
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 