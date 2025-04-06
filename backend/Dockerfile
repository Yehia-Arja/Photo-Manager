FROM php:8.3-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    mariadb-client \
    && docker-php-ext-install pdo pdo_mysql zip

RUN a2enmod rewrite


COPY apache.conf /etc/apache2/sites-available/000-default.conf


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
