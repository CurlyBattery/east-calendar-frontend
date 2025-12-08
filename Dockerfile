FROM node:23-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# Удалите дефолтный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Скопируйте папку nginx/ с вашим конфигом
COPY nginx /etc/nginx/conf.d

# Скопируйте собранное приложение
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]