# Pet Shop - Интернет-магазин товаров для животных

## Описание
Pet Shop - это современный интернет-магазин товаров для животных, разработанный с использованием React и Vite. Проект включает в себя полный функционал электронного магазина, включая каталог товаров, корзину покупок, систему аутентификации и виртуальную оплату.

## Основные функции
- 📱 Адаптивный дизайн для всех устройств
- 🔐 Система аутентификации (регистрация и вход)
- 🛒 Корзина покупок с возможностью изменения количества товаров
- 💳 Виртуальная система оплаты через Сбербанк(Эмуляция)
- ⭐ Система отзывов и рейтингов для товаров
- 🔍 Поиск товаров по названию
- 🏷️ Фильтрация товаров по категориям
- 📦 Отображение детальной информации о товарах

## Технологии
- React 18
- Vite
- Redux Toolkit
- React Router
- CSS Modules
- LocalStorage для хранения состояния

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/shop_pet_react-vite.git
```

2. Установите зависимости:
```bash
cd shop_pet_react-vite
npm install
npm install react-router-dom
```

3. Запустите проект:
```bash
npm run dev
```

4. Откройте браузер и перейдите по адресу:
```
http://localhost:5173
```

## Структура проекта
```
src/
├── components/         # React компоненты
├── store/             # Redux store и слайсы
├── styles/            # CSS стили
├── assets/            # Статические ресурсы
└── App.jsx            # Корневой компонент
```

## Особенности реализации

### Система аутентификации
- Регистрация новых пользователей
- Вход в систему
- Хранение данных пользователя в localStorage
- Защищенные маршруты

### Корзина покупок
- Добавление/удаление товаров
- Изменение количества
- Подсчет общей стоимости
- Сохранение состояния между сессиями

### Система оплаты
- Валидация данных карты
- Имитация процесса оплаты
- Подтверждение оплаты в отдельном окне
- Уведомления об успешной оплате

### Отзывы и рейтинги
- Добавление отзывов к товарам
- Система рейтинга со звездами
- Хранение отзывов в Redux store

## Разработка
Проект использует современные практики разработки:
- Компонентный подход
- Управление состоянием через Redux
- Модульные CSS стили
- Адаптивный дизайн
- Оптимизация производительности

## Лицензия
MIT
