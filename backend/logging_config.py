import logging
from logging.handlers import RotatingFileHandler
import os

LOG_FILE = "app.log"
LOG_DIR = "logs"

# Создаем директорию для логов
os.makedirs(LOG_DIR, exist_ok=True)

# Настройка ротации логов
handler = RotatingFileHandler(
    os.path.join(LOG_DIR, LOG_FILE),
    maxBytes=1024 * 1024 * 5,  # 5 MB
    backupCount=5
)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# Настройка корневого логгера
logging.basicConfig(
    level=logging.INFO,
    handlers=[handler]
)

# Добавляем консольный обработчик для вывода в консоль
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logging.getLogger().addHandler(console_handler)

# Настройка логгера для SQLAlchemy
sqlalchemy_logger = logging.getLogger('sqlalchemy')
sqlalchemy_logger.setLevel(logging.WARNING)
