FROM node:20.5.1

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 3306

CMD ["node", "index.js"]
