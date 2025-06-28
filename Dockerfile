# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Kopiujemy tylko potrzebne pliki
COPY dist/ ./dist
COPY package.json .
COPY package-lock.json .

# Instalujemy serwer HTTP
RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5000"]
