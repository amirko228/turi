export interface Tour {
  id: number;
  hotelName: string;
  imageUrl: string;
  price: number;
  country: string;
  city: string;
  nights: number;
  meals: string;
  rating: number;
  stars: number;
}

export const tours: Tour[] = [
  {
    id: 1,
    hotelName: "Grand Resort & Spa",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 125000,
    country: "Турция",
    city: "Анталья",
    nights: 7,
    meals: "Все включено",
    rating: 4.8,
    stars: 5
  },
  {
    id: 2,
    hotelName: "Seaside Paradise",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 98000,
    country: "Турция",
    city: "Белек",
    nights: 10,
    meals: "Завтрак и ужин",
    rating: 4.6,
    stars: 4
  },
  {
    id: 3,
    hotelName: "Mountain View Resort",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 145000,
    country: "ОАЭ",
    city: "Дубай",
    nights: 8,
    meals: "Все включено",
    rating: 4.9,
    stars: 5
  },
  {
    id: 4,
    hotelName: "Tropical Dreams",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 165000,
    country: "Мальдивы",
    city: "Мале",
    nights: 12,
    meals: "Все включено",
    rating: 4.7,
    stars: 5
  },
  {
    id: 5,
    hotelName: "Sunset Beach Hotel",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 89000,
    country: "Турция",
    city: "Кемер",
    nights: 7,
    meals: "Завтрак",
    rating: 4.5,
    stars: 4
  },
  {
    id: 6,
    hotelName: "Royal Palace Resort",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 195000,
    country: "ОАЭ",
    city: "Абу-Даби",
    nights: 10,
    meals: "Все включено",
    rating: 4.9,
    stars: 5
  },
  {
    id: 7,
    hotelName: "Coastal Breeze",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 110000,
    country: "Турция",
    city: "Сиде",
    nights: 8,
    meals: "Завтрак и ужин",
    rating: 4.6,
    stars: 4
  },
  {
    id: 8,
    hotelName: "Desert Oasis",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 175000,
    country: "ОАЭ",
    city: "Шарджа",
    nights: 9,
    meals: "Все включено",
    rating: 4.8,
    stars: 5
  }
]; 