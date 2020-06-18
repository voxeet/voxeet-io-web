Dolby Interactivity APIs Web Showcase App
=====================

<p align="center">
<img src="https://cdn.dolby.io/wp-content/uploads/2020/05/Dolbyio-white-horizontal-e1589344433251.jpg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="200"/>
</p>

This is a sample application to show how the Voxeet Web ConferenceKit works.

  - Join a conference
  - Customise Modes

## Table of contents

  1. [Project setup](#project-setup)
  1. [Initializing the sample](#initializing-the-sample)
  1. [Running the sample](#running-the-sample)
  1. [Customise the Sample](#customise-the-sample)
  1. [Dependencies](#dependencies)

## Project setup

 - Clone the project
 - Get your app consumerKey and consumerSecret on [Dolby.io](https://dolby.io/developers/interactivity-apis/client-sdk/initializing)
 - Start the backend authentication server
 - Start the frontend server
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

## Dependencies

  * [Dolby Interactivity APIs Web UXKit](https://www.npmjs.com/package/@voxeet/react-components)
  * [Dolby Interactivity APIs Web SDK](https://www.npmjs.com/package/@voxeet/voxeet-web-sdk)

© Voxeet, 2018
