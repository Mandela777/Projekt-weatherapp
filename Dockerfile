FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Gotowy obraz – tylko zbudowane pliki
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist /app

# Nie uruchamia nic – tylko daje gotowe pliki
CMD ["sh"]
