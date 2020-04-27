FROM nginx:1.17.0-alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
