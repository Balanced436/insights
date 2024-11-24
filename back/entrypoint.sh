#!/bin/sh

POSTGRES_USER=$(cat /run/secrets/postgres_user)
POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password)
POSTGRES_DB=$(cat /run/secrets/postgres_db)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?schema=public"

## Write the databse_url string in .env file
echo "DATABASE_URL=$DATABASE_URL" >> .env

npx prisma db push

# Générer le client Prisma
npx prisma generate

# Vérifier si l'application est en mode développement
if [ "$NODE_ENV" = "development" ]; then
    echo "Lancement de prisma"
    npx prisma studio &
    echo "Lancement en mode dev"
    npm run dev
else
    echo "Lancement en mode prod"
    npm start
fi