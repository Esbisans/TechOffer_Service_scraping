FROM node:16.18.0

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install -g npm@8.19.3
RUN npm install 

COPY . .

EXPOSE 8080
CMD ["node", "app.js"]

