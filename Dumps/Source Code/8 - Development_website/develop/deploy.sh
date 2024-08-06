#!/bin/bash

cd /home/twweb/web
sudo php artisan down
rm -rf package-lock.json
git pull
npm install
npm run build
npm audit fix
export COMPOSER_ALLOW_SUPERUSER=1
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan optimize:clear
php artisan optimize
php artisan event:clear
php artisan cache:clear
php artisan view:clear
php artisan config:clear
php artisan route:clear
php artisan event:cache
php artisan route:cache
php artisan config:cache
sudo php artisan view:cache
php artisan db:seed ImportDynamicContent --force
sudo php artisan up
