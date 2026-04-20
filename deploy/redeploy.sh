#!/bin/bash
# Скрипт деплоя обновлений на VPS
# Запускать из директории проекта: bash deploy/redeploy.sh
# Требует: pm2 установлен глобально, APP_DIR задан

set -e

APP_DIR="${APP_DIR:-/var/www/vladen}"
PM2_APP_NAME="vladen"

echo "=== [1/5] Установка зависимостей ==="
npm ci --omit=dev

echo "=== [2/5] Сборка проекта ==="
npm run build

echo "=== [3/5] Копирование статики в standalone (ОБЯЗАТЕЛЬНО для CSS/JS) ==="
# Next.js standalone не включает статику автоматически — копируем вручную
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

echo "=== [4/5] Перезапуск pm2 ==="
if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  pm2 restart "$PM2_APP_NAME"
else
  pm2 start .next/standalone/server.js --name "$PM2_APP_NAME"
  pm2 save
fi

echo "=== [5/5] Готово ==="
pm2 status "$PM2_APP_NAME"
echo ""
echo "Если стили всё ещё не грузятся — очистите кэш nginx:"
echo "  sudo nginx -t && sudo systemctl reload nginx"
