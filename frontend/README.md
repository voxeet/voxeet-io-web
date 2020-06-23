Dolby Interactivity APIs Web Showcase App - Frontend
=====================

<p align="center">
<img src="https://cdn.dolby.io/wp-content/uploads/2020/05/Dolbyio-white-horizontal-e1589344433251.jpg" alt="Voxeet SDK logo" title="Dolby.io logo" width="200"/>
</p>

This is a front end part of the showcase application, which acquires access token from the backend part of the showcase app to communicate with the Dolby Interactivity APIs platform. 


## Initializing the app
```bash
     $ yarn install
```

## Configuring the backend

By default, your frontend application will make REST API calls to the same hostname and port where your frontend is available.
To change this behavior, set the environment variable `AUTH_SERVER` :

```bash
    $ export AUTH_SERVER=http://localhost:3500
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

## Customise the front end app
  UI customization is supported through UXKit [ConferenceRoom](https://dolby.io/developers/interactivity-apis/client-ux-kit/uxkit-voxeet-react#uxkit-properties) object.
  
## Dependencies
  * [Dolby Interactivity APIs Web UXKit](https://www.npmjs.com/package/@voxeet/react-components)
  * [Dolby Interactivity APIs Web SDK](https://www.npmjs.com/package/@voxeet/voxeet-web-sdk)

Complete list of dependencies are available in the `package.json` file.

© Dolby.io, 2020
