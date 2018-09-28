FROM node:8

WORKDIR /app
COPY ./node_modules ./node_modules
COPY ./lib ./lib
EXPOSE 9000
CMD node lib/root.js && node lib/folder/nested.js