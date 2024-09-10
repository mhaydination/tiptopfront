FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
# Fetching the minified node image on apline linux

