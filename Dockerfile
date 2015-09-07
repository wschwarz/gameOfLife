## Game of Life

FROM node:0.12.7-slim

RUN apt-get update && \
    apt-get clean && apt-get autoclean && \
    mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT ["npm"]

EXPOSE 3000