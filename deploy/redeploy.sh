#!/bin/bash
# Скрипт деплоя обновлений на VPS
# Запускать из директории проекта: bash deploy/redeploy.sh
# Требует: pm2 установлен глобально, APP_DIR задан

set -e

APP_DIR="${APP_DIR:-/var/www/vladen}"
PM2_APP_NAME="vladen"

echo "=== [1/5] Установка зависимостей ==="
# Полный набор: TypeScript нужен для чтения next.config.ts на этапе сборки.
# В standalone-сборку devDependencies всё равно не попадают (трейсинг), прод не раздувается.
npm ci

echo "=== [2/5] Сборка проекта ==="
npm run build

echo "=== [3/5] Копирование статики и env в standalone ==="
# Next.js standalone не включает статику автоматически — копируем вручную
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# .env.local: standalone читает env ТОЛЬКО из своей директории (process.cwd = .next/standalone).
# Файл пересоздаётся при каждом build — копируем обратно и жёстко проверяем наличие.
cp .env.local .next/standalone/.env.local
chmod 600 .next/standalone/.env.local
if [ ! -f .next/standalone/.env.local ]; then
  echo "ERROR: .next/standalone/.env.local не создан — СТОП" >&2
  exit 1
fi
echo "  .env.local скопирован в standalone OK"

echo "=== [4/5] Перезапуск pm2 ==="
if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  pm2 restart "$PM2_APP_NAME" --update-env
else
  pm2 start .next/standalone/server.js --name "$PM2_APP_NAME"
  pm2 save
fi

echo "=== [5/5] Готово ==="
pm2 status "$PM2_APP_NAME"
echo ""
echo "Если стили всё ещё не грузятся — очистите кэш nginx:"
echo "  sudo nginx -t && sudo systemctl reload nginx"
