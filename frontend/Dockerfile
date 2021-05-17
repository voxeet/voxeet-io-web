FROM node:14 as build

ARG WEB_SDK_DIST_TAG
ARG UX_KIT_DIST_TAG
ARG CUSTOM_REGISTRY_URL
ARG CUSTOM_REGISTRY_TOKEN

WORKDIR /app
COPY . .
RUN test -z "$WEB_SDK_DIST_TAG" || { npm config set registry="$CUSTOM_REGISTRY_URL" ; npm config set $CUSTOM_REGISTRY_TOKEN ; npm config set always-auth true ; yarn add -E @voxeet/voxeet-web-sdk@$WEB_SDK_DIST_TAG; } && : \
    && test -z "$UX_KIT_DIST_TAG" || { npm config set registry="$CUSTOM_REGISTRY_URL" ; npm config set $CUSTOM_REGISTRY_TOKEN ; npm config set always-auth true ; yarn add -E @voxeet/react-components@$UX_KIT_DIST_TAG; } && : \
    && yarn install \
    && yarn build

FROM nginx:1.19.0-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
