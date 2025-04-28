export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Наши контакты</h2>
          <div className="space-y-4">
            <p className="flex items-center">
              <span className="font-medium mr-2">Email:</span>
              <a href="mailto:info@turi.ru" className="text-primary hover:underline">
                info@turi.ru
              </a>
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Телефон:</span>
              <a href="tel:+74951234567" className="text-primary hover:underline">
                +7 (495) 123-45-67
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Адрес офиса</h2>
          <p className="text-gray-600">
            г. Москва, ул. Примерная, д. 1<br />
            Бизнес-центр "Пример"<br />
            10 этаж, офис 1010
          </p>
        </div>
      </div>
    </div>
  );
} 