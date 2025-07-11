import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
ADMIN_USER_ID = os.getenv('ADMIN_USER_ID')
API_URL = os.getenv('API_URL')
API_TOKEN = os.getenv('API_TOKEN')

print(f"TELEGRAM_TOKEN: {TELEGRAM_TOKEN}")
print(f"ADMIN_USER_ID: {ADMIN_USER_ID}")
print(f"API_URL: {API_URL}")
print(f"API_TOKEN: {API_TOKEN}")

if not TELEGRAM_TOKEN or TELEGRAM_TOKEN == '':
    print('ОШИБКА: TELEGRAM_TOKEN не найден или пустой! Проверьте backend/.env и переменную TELEGRAM_TOKEN.')
    exit(1)
if not ADMIN_USER_ID or ADMIN_USER_ID == '':
    print('ОШИБКА: ADMIN_USER_ID не найден или пустой! Проверьте backend/.env и переменную ADMIN_USER_ID.')
    exit(1)
ADMIN_USER_ID = int(ADMIN_USER_ID)
if not API_URL or API_URL == '':
    print('ОШИБКА: API_URL не найден или пустой! Проверьте backend/.env и переменную API_URL.')
    exit(1)
if not API_TOKEN or API_TOKEN == '':
    print('ОШИБКА: API_TOKEN не найден или пустой! Проверьте backend/.env и переменную API_TOKEN.')
    exit(1)

# Далее остальной код бота...
