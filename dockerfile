FROM node:lts-slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt update
RUN apt upgrade -y

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@9.2.0
RUN npm install



COPY . .

EXPOSE 8080
CMD ["node", "app.js"]