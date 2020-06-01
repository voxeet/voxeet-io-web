Voxeet Web ConferenceKit
=====================

<p align="center">
<img src="https://www.voxeet.com/wp-content/themes/wp-theme/assets/images/logo.svg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="100"/>
</p>

This is a sample application to show how the Voxeet Web ConferenceKit works.

  - Join a conference
  - Customise Modes

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
