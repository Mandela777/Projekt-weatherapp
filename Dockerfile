FROM node:20-alpine

WORKDIR /app


COPY . .


RUN npm install
RUN npm install -g serve


EXPOSE 5000
EXPOSE 3000


CMD ["sh", "-c", "node pogoda.js & serve -s dist -l 3000"]
