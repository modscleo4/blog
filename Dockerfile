FROM node:alpine AS build

WORKDIR /app

COPY . /app

ARG API_URL
ARG APP_URL
ENV VITE_API_URL $API_URL
ENV VITE_APP_URL $APP_URL

RUN npm ci; \
    npm run build;

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
