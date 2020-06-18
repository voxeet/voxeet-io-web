Dolby Interactivity APIs Showcase App - Backend Token Auth server
=====================

<p align="center">
<img src="https://cdn.dolby.io/wp-content/uploads/2020/05/Dolbyio-white-horizontal-e1589344433251.jpg" alt="Voxeet SDK logo" title="Dolby.io logo" width="200"/>
</p>

This is the backend part of the showcase app. The backend token authentication server uses [Authentication API](https://dolby.io/developers/interactivity-apis/rest-apis/authentication#operation/postOAuthToken) to retrieve an access token on behalf of the front end app, and passes the access token to the front end app. For more information regarding token authentication, refer to this [document](https://dolby.io/developers/interactivity-apis/client-sdk/initializing).

You can choose to run the server either in your local machine using `yarn start`, or using `docker`.

## Project setup

- Get your Dolby Interactivity APIs consumerKey and consumerSecret on [Dolby.io developer portal](https://dolby.io/developers/interactivity-apis/client-sdk/initializing).
- Create localhost certificiate using [mkcert](https://github.com/FiloSottile/mkcert).
```
$ mkcert 127.0.0.1
Using the local CA at "/Users/{user}/Library/Application Support/mkcert" 
Warning: the local CA is not installed in the Firefox trust store! 
Run "mkcert -install" to avoid verification errors 

Created a new certificate valid for the following names 
 - "127.0.0.1"

The certificate is at "./127.0.0.1.pem" and the key at "./127.0.0.1-key.pem"

```
- Export environment variables
```
$ export KEY_PATH=127.0.0.1-key.pem 
$ export CERT_PATH=127.0.0.1.pem 
$ export CA_PATH=127.0.0.1.pem
```
## yarn
 - For quick, local setup on your computer, use this procedure.
 - Set up the environment variables as following:
 ```
$ export CKEY={Your Consumer Key}
$ export CSEC={Your Consumer Secret}
 ```
 - **Install dependencies**
 ```
 yarn install
 ```
 - **Start**
 ```
 yarn start
 ```
 Your local server is now running at `https://127.0.0.1:3500`

## Running inside a container

 - Enter the consumerKey and consumerSecret inside the [ckey.txt](./certs/ckey.txt) and [csec.txt](./certs/csec.txt) respectively.
 - Copy certificate and key files generated earlier to [ca.pem](./certs/ca.pem), [key.pem](./certs/key.pem), [cert.pem](./certs/cert.pem).
 - Edit local host IP and Port in [docker-compose.yml](./docker-compose.yml).

**Start:**

`docker-compose -f ./docker-compose.yml up`

The server is now running on: `https://localhost:3500/`

**Stop:**

`docker-compose -f ./docker-compose.yml down`

**Stop and remove all images:**

`docker-compose -f ./docker-compose.yml down --rmi all`

## Tools
  * [mkcert](https://github.com/FiloSottile/mkcert) - A simple zero-config tool to make locally trusted development certificates.
  * [Docker compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications.

© Dolby.io, 2020
