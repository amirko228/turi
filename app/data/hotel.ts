export interface HotelImage {
  id: number;
  url: string;
  alt: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  description: string;
  images: HotelImage[];
  price: number;
  amenities: Amenity[];
  reviews: Review[];
  location: {
    country: string;
    city: string;
    address: string;
  };
}

export const hotel: Hotel = {
  id: 1,
  name: "Grand Resort & Spa",
  stars: 5,
  description: "Роскошный отель на берегу моря с собственным пляжем и спа-центром. Современные номера с видом на море, рестораны высокой кухни и множество развлечений для всей семьи.",
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Главный фасад отеля"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Бассейн"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Спа-центр"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Ресторан"
    }
  ],
  price: 125000,
  amenities: [
    { id: 1, name: "Wi-Fi", icon: "📶" },
    { id: 2, name: "Бассейн", icon: "🏊" },
    { id: 3, name: "Спа-центр", icon: "💆" },
    { id: 4, name: "Ресторан", icon: "🍽️" },
    { id: 5, name: "Фитнес-центр", icon: "💪" },
    { id: 6, name: "Пляж", icon: "🏖️" },
    { id: 7, name: "Бар", icon: "🍹" },
    { id: 8, name: "Парковка", icon: "🅿️" }
  ],
  reviews: [
    {
      id: 1,
      author: "Анна К.",
      rating: 5,
      date: "15.03.2024",
      text: "Отличный отель! Прекрасный сервис, чистые номера и вкусная еда. Особенно понравился спа-центр и пляж."
    },
    {
      id: 2,
      author: "Михаил П.",
      rating: 4,
      date: "10.03.2024",
      text: "Хороший отель, но есть небольшие недочеты в обслуживании. В целом остались довольны отдыхом."
    }
  ],
  location: {
    country: "Турция",
    city: "Анталья",
    address: "Konyaalti Beach, 07050"
  }
}; 