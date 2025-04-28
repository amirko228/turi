'use client';

import { Amenity } from '../data/hotel';

interface AmenitiesListProps {
  amenities: Amenity[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {amenities.map((amenity) => (
        <div
          key={amenity.id}
          className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-soft hover:shadow-md transition-all duration-200"
        >
          <span className="text-2xl">{amenity.icon}</span>
          <span className="text-gray-700">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
} 