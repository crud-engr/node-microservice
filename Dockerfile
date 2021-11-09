FROM node:14.17.4

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD [ "npm", "start" ]