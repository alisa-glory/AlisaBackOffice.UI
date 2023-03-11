#stage 1
# FROM node:latest as node
FROM node:16.17.0-alpine as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/alisa-back-office.ui /usr/share/nginx/html
