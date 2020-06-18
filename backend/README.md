Dolby Interactivity APIs Showcase App - Backend Token Auth server
=====================

<p align="center">
<img src="https://cdn.dolby.io/wp-content/uploads/2020/05/Dolbyio-white-horizontal-e1589344433251.jpg" alt="Voxeet SDK logo" title="Dolby.io logo" width="200"/>
</p>

This is the backend part of the showcase app. The backend authentication server uses [Authentication API](https://dolby.io/developers/interactivity-apis/rest-apis/authentication#operation/postOAuthToken) to retrieve an access token on behalf of the front end app, and passes the access token to the front end app upon request. For more information regarding token authentication, refer to this [document](https://dolby.io/developers/interactivity-apis/client-sdk/initializing).

## Table of contents

  1. [Project setup](#project-setup)
  1. [Running the container](#running-the-container)
  1. [Tech](#tech)

## Project setup

 - Download the sample
 - Get your Voxeet consumerKey and consumerSecret on our portal. ([Developer Portal](https://dolby.io/))
 - Put your keys inside the [ckey.txt](./certs/ckey.txt) and [csec.txt](./certs/csec.txt)
 - Generate certificate for local server. For more details see [mkcert](https://github.com/FiloSottile/mkcert) 
 - Copy certificates to [ca.pem](./certs/ca.pem), [key.pem](./certs/key.pem), [cert.pem](./certs/cert.pem).
 - Edit local host IP and Port in [docker-compose.yml](./docker-compose.yml)

## Running the container
Start:

`docker-compose -f ./docker-compose.yml up`

The server is now running on: [https://localhost:3500/](https://localhost:3500/)

Stop:

`docker-compose -f ./docker-compose.yml down`

Stop and remove all images:

`docker-compose -f ./docker-compose.yml down --rmi all`

## Tech

  * [mkcert](https://github.com/FiloSottile/mkcert) - A simple zero-config tool to make locally trusted development certificates with any names you'd like
  * [Docker compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications.

© Voxeet, 2020
