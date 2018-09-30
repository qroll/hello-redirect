FROM node:8

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9000
CMD cd /app && npm run redirect