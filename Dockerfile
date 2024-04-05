FROM node:latest

WORKDIR /app

COPY . .

RUN npm install


EXPOSE 8000

CMD ["code","dist/index.js"]