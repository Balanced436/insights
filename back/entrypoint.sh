#!/bin/sh

POSTGRES_USER=$(cat /run/secrets/postgres_user)
POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password)
POSTGRES_DB=$(cat /run/secrets/postgres_db)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?schema=public"

## Write the databse_url string in .env file
echo "DATABASE_URL=$DATABASE_URL" >> .env

# Vérifier si l'application est en mode développement
if [ "$NODE_ENV" = "development" ]; then
    echo "Lancement de prisma"
    npm run resetdb &
    npx prisma studio &
    echo "Lancement en mode dev"
    npm run test &
    npm run dev
else
    echo "Lancement en mode prod"
    npm start
fi