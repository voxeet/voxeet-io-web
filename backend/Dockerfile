FROM node:lts as node_modules

WORKDIR /home/node/app

COPY package.json .
RUN npm install --quiet

FROM node:lts

WORKDIR /home/node/app

COPY package.json .
COPY src/app.js ./app.js
COPY --from=node_modules /home/node/app/node_modules ./node_modules
RUN ls -la .
RUN pwd

CMD npm run docker_start

