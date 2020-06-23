FROM node:12 as build

ARG WEB_SDK_DIST_TAG
ARG NPM_TOKEN

WORKDIR /app
COPY . .
RUN test -z "$WEB_SDK_DIST_TAG" || { cp .npmrc.nexus .npmrc; yarn add @voxeet/voxeet-web-sdk@$WEB_SDK_DIST_TAG; } && : \
    && yarn install \
    && yarn build

FROM nginx:1.19.0-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
