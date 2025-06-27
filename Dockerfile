FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Serwer np. z 'serve' (albo Vite preview)
RUN npm install -g serve

FROM node:20

WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["serve", "-s", "dist", "-l", "5000"]

