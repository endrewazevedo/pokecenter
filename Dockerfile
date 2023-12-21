FROM node:19.4-slim AS base
WORKDIR  /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get install -y openssl nodejs
FROM base as development
RUN npm ci
COPY . ./
RUN npx prisma generate
EXPOSE 3006
