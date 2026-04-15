#!/bin/bash
# Скрипт первичной настройки VPS (Ubuntu 22.04)
# Запускать от root: bash setup.sh

set -e

DOMAIN="vladen-crimea.ru"
APP_DIR="/var/www/vladen"

echo "=== 1. Обновление системы ==="
apt update && apt upgrade -y

echo "=== 2. Установка Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo "=== 3. Установка nginx + certbot ==="
apt install -y nginx certbot python3-certbot-nginx

echo "=== 4. Установка pm2 ==="
npm install -g pm2

echo "=== 5. Создание директории приложения ==="
mkdir -p $APP_DIR

echo ""
echo "=== Готово. Дальше вручную: ==="
echo "1. Загрузи проект: git clone или scp"
echo "2. cd $APP_DIR && npm ci && npm run build"
echo "3. Создай .env.local с ключами"
echo "4. pm2 start .next/standalone/server.js --name vladen"
echo "5. pm2 save && pm2 startup"
echo "6. Скопируй deploy/nginx.conf в /etc/nginx/sites-available/$DOMAIN"
echo "7. ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "8. certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "9. nginx -t && systemctl reload nginx"
