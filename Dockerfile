# stage 1
FROM node:20-alpine3.17 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.25.2-alpine

RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

# CMD [ "nginx","-g","daemon off" ]

