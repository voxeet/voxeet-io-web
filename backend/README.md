Dolby Communications API Showcase App - Back End Token Auth Server
=====================

<p align="center">
<img src="https://avatars.githubusercontent.com/u/18720732?s=400&u=45d941e2da8503d7e226d1b868accdc132327652" alt="Dolby.io SDK logo" title="Dolby.io logo" width="200"/>
</p>

This is the back end part of the showcase app. The backend token authentication server uses [Authentication API](https://dolby.io/developers/interactivity-apis/rest-apis/authentication#operation/postOAuthToken) to retrieve an access token on behalf of the front end app, and passes the access token to the front end app. For more information regarding token authentication, refer to this [document](https://dolby.io/developers/interactivity-apis/client-sdk/initializing).

You can choose to run the server either on your local machine using `yarn start`, or using `docker`.

## Project setup

- Get your Dolby Interactivity APIs consumerKey and consumerSecret on [Dolby.io developer portal](https://dolby.io/developers/interactivity-apis/client-sdk/initializing).
- Create a localhost certificate using [mkcert](https://github.com/FiloSottile/mkcert).
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
 For quick, local setup on your computer, use this procedure.
 - **Set up the environment variables**
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
 Your local server is now running at `https://127.0.0.1:3500`.

## Running inside a container

 - Enter the consumerKey and consumerSecret inside the [ckey.txt](./certs/ckey.txt) and [csec.txt](./certs/csec.txt), respectively.
 - Copy the certificate and the key files generated earlier to [ca.pem](./certs/ca.pem), [key.pem](./certs/key.pem), [cert.pem](./certs/cert.pem).
 - Edit the local host IP and the Port in [docker-compose.yml](./docker-compose.yml).

**Start:**

`docker-compose -f ./docker-compose.yml up`

The server is now running at `https://localhost:3500/`.

**Stop:**

`docker-compose -f ./docker-compose.yml down`

**Stop and remove all images:**

`docker-compose -f ./docker-compose.yml down --rmi all`

## Tools
  * [mkcert](https://github.com/FiloSottile/mkcert) - A simple zero-config tool to make locally trusted development certificates.
  * [Docker compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications.

## Environment variables

Environment variables as defined in [app.js](src/app.js), allow developers to customize where the authentication server reads the configuration.

| Variable   | Default  | Description     |
|----------  | -------- | --------    |
| CKEY       |      | ConsumerKey |
| CKEY_PATH  | ./certs/ckey.txt | ConsumerKey file path, if CKEY exists this is ignored | 
| CSEC       |      | ConsumerSecret|
| CSEC_PATH  | ./certs/csec.txt | ConsumeSecret file path, if CSEC exists this is ignored| 
| LOCAL_PORT | 3500 | Local listen port | 
| LOCAL_HOST | https://127.0.0.1:3500 | Full URL of the server|
| KEY_PATH | ./certs/key.pem | Private key for the HTTPS server certificate|
| CERT_PATH | ./certs/cert.pem | X.509 Certificate for the HTTP server|
| CA_PATH | ./certs/ca.pem | X.509 Certificate Authority (CA)|

© Dolby.io, 2020
