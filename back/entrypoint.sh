#!/bin/sh

POSTGRES_USER=$(cat /run/secrets/postgres_user)
POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password)
POSTGRES_DB=$(cat /run/secrets/postgres_db)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?schema=public"
echo "DATABASE_URL=$DATABASE_URL" >> .env

POSTGRES_USER_TEST="${POSTGRES_USER}"
POSTGRES_PASSWORD_TEST="${POSTGRES_PASSWORD}"
POSTGRES_DB_TEST="${POSTGRES_DB}_test"
DATABASE_URL_TEST="postgresql://${POSTGRES_USER_TEST}:${POSTGRES_PASSWORD_TEST}@${POSTGRES_HOST}:5432/${POSTGRES_DB_TEST}?schema=public"
echo "DATABASE_URL=$DATABASE_URL_TEST" >> .env.test

if [ "$NODE_ENV" = "development" ]; then
    echo "Lancement de prisma en mode dev"
    npm run reset
    npm run push
    npm run seed
    npm run dev
    npx prisma studio &

    echo "Lancement de prisma en mode test"
    npm run reset:test
    npm run push:test
    npm run seed:test

else
    echo "Lancement en mode prod"
    npm start
fi