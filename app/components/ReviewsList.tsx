'use client';

import { Review } from '../data/hotel';

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-secondary">{review.author}</h3>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-700">{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-600">{review.text}</p>
        </div>
      ))}
    </div>
  );
} 