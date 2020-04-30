FROM node:12 as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.17.0-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
