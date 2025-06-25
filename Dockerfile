# Etapa 1: Build da aplicação
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/gerador-senha /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
