'use client';

import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: {
    priceRange: [number, number];
    rating: number;
    stars: number;
  }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
    onFilterChange({ priceRange: [priceRange[0], priceRange[1]], rating, stars });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setRating(value);
    onFilterChange({ priceRange, rating: value, stars });
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setStars(value);
    onFilterChange({ priceRange, rating, stars: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2 className="font-poppins font-semibold text-xl mb-4">Фильтры</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Цена</h3>
          <div className="space-y-2">
            <input
              type="number"
              name="minPrice"
              placeholder="От"
              className="input-field"
              value={priceRange[0]}
              onChange={handlePriceChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="До"
              className="input-field"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Рейтинг</h3>
          <select
            className="input-field"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="0">Любой рейтинг</option>
            <option value="4">От 4.0</option>
            <option value="4.5">От 4.5</option>
            <option value="4.8">От 4.8</option>
          </select>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Звезды отеля</h3>
          <select
            className="input-field"
            value={stars}
            onChange={handleStarsChange}
          >
            <option value="0">Любая категория</option>
            <option value="3">3 звезды</option>
            <option value="4">4 звезды</option>
            <option value="5">5 звезд</option>
          </select>
        </div>
      </div>
    </div>
  );
} 