# KeeperContact

Система управления контактами с веб-интерфейсом и Telegram ботом.

## Установка

1. Установите зависимости:
```bash
pip install -r backend/requirements.txt
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp backend/.env.example backend/.env
```

3. Запустите базу данных:
```bash
python backend/main.py
```

4. Запустите фронтенд:
```bash
cd frontend
npm start
```

## Структура проекта

- `backend/` - FastAPI сервер
  - `main.py` - основной файл приложения
  - `config.py` - конфигурация
  - `logging_config.py` - настройка логирования
  - `.env` - переменные окружения

- `frontend/` - React приложение
  - `src/` - исходный код
  - `public/` - статические файлы

- `photos/` - директория для хранения фотографий

## Функциональность

- Управление контактами
- Аутентификация пользователей
- Загрузка и просмотр фотографий
- Telegram бот для взаимодействия
- Экспорт/импорт данных

## Безопасность

- JWT аутентификация
- Хеширование паролей
- CORS защита
- Логирование операций

## Разработка

Для запуска в режиме разработки:

```bash
# Backend
uvicorn backend.main:app --reload

# Frontend
cd frontend
npm start
```
