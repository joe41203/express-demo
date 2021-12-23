# !/bin/sh

until mysqladmin ping -h db --silent; do
  echo 'waiting for mysqld to be connectable...'
  sleep 2
done

npx prisma migrate dev --name init


