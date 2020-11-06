FROM node:14

RUN mkdir app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

ENTRYPOINT [ "npm", "start" ]