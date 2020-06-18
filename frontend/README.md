Dolby Interactivity APIs Web Showcase App - Frontend
=====================

<p align="center">
<img src="https://cdn.dolby.io/wp-content/uploads/2020/05/Dolbyio-white-horizontal-e1589344433251.jpg" alt="Voxeet SDK logo" title="Dolby.io logo" width="200"/>
</p>

This is a sample application to show how backend authentication server can be implemented. The backend authentication server uses the [Authentication API](https://dolby.io/developers/interactivity-apis/rest-apis/authentication#operation/postOAuthToken) to acquire an access token and pass to the front end application, so it can connect to the Dolby Interactivity API platform.


## Table of contents

  1. [Project setup](#project-setup)
  1. [Initializing the sample](#initializing-the-sample)
  1. [Running the sample](#running-the-sample)
  1. [Customise the Sample](#customise-the-sample)
  1. [Tech](#tech)

## Project setup

 - Download the sample
 - Get your Voxeet consumerKey and consumerSecret on our portal. ([Developer Portal Voxeet](https://developer.voxeet.com))
 - Put your keys inside the ConferenceRoom
 - Enter a Conference alias inside the ConferenceRoom

## Initializing the sample

```bash
     $ yarn install
```

## Running the sample

```bash
    $ yarn start
```

## Building the sample (generate bundle file)

```bash
    $ yarn run build
```

The project is now running, go to : https://localhost:8080/

## Customise the Sample

  A lot of configuration are possible for this component.
  All configurations and property are write inside the npm package, feel free to modify the ConferenceRoom inside the react-sample to see how it works !
  ([Voxeet React Components](https://www.npmjs.com/package/@voxeet/react-components))

## Tech

  * [Voxeet React Components](https://www.npmjs.com/package/@voxeet/react-components) - The React Component Voxeet Widget
  * [Voxeet Web SDK](https://www.npmjs.com/package/@voxeet/voxeet-web-sdk) - The WEB SDK Voxeet to communicate with Voxeet Servers

© Voxeet, 2018
