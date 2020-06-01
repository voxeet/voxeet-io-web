Voxeet Token Auth server
=====================

<p align="center">
<img src="https://www.voxeet.com/wp-content/themes/wp-theme/assets/images/logo.svg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="100"/>
</p>

This is a ...

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
