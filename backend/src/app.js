const express = require('express')
const app = express()
const https = require('https');
const axios = require('axios');
const btoa = require('btoa');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(new cors());
app.use(bodyParser.json());

let accessToken = null;
let refreshToken = null;

// console.log(process.env)

const customerKey = process.env.CKEY ? process.env.CKEY : path.resolve(__dirname, './cert/ckey.txt');
const customerSecret = process.env.CSEC ? process.env.CSEC : path.resolve(__dirname, './cert/csec.txt');
console.log('key/sec', customerKey, customerSecret)
const server = process.env.SESSION_HOST ? `https://${process.env.SESSION_HOST}` : `https://session.voxeet.com`;
const port = process.env.LOCAL_PORT ? process.env.LOCAL_PORT : 3500;
const callback_prefix = process.env.LOCAL_HOST ? `https://${process.env.LOCAL_HOST}:${port}` : "https://127.0.0.1:3500"; // Fix this

const key_path = process.env.KEY_PATH ? process.env.KEY_PATH : path.resolve(__dirname, './cert/key.pem');
const cert_path = process.env.CERT_PATH ? process.env.CERT_PATH : path.resolve(__dirname, './cert/cert.pem');
const ca_path = process.env.CA_PATH ? process.env.CA_PATH : path.resolve(__dirname, './cert/ca.pem');

const authHeader = "Basic " + btoa(encodeURI(fs.readFileSync(customerKey)) + ":" + encodeURI(fs.readFileSync(customerSecret)));

const requests = {
  token: {
    method: "POST",
    url: `${server}/v1/oauth2/token`,
    headers: {
      'Authorization': authHeader
    },
    data: {
      grant_type: 'client_credentials'
    }
  },
  refresh: {
    method: "POST",
    url: `${server}/v1/oauth2/refresh`,
    headers: {
      'Authorization': authHeader
    }
  },
  invalidate: {
    method: "POST",
    url: `${server}/v1/oauth2/invalidate`,
    headers: {
      'Authorization': authHeader
    }
  },
  mix: {
    method: "POST",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/record?callback=${callback_prefix}/api/finished/%conferenceId%`,
    headers: {
      'Authorization': authHeader
    }
  },
  mix2: {
    method: "POST",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/record?callback=${callback_prefix}/api/finished2/%conferenceId%`,
    headers: {
      'Authorization': authHeader
    }
  },
  live: {
    method: "POST",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/live`,
    headers: {
      'Authorization': authHeader
    }
  },
  stop: {
    method: "POST",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/stop`,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    }
  },
  url: {
    method: "GET",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/url`,
    headers: {
      'Authorization': authHeader
    }
  },
  status: {
    method: "GET",
    url: `${server}/v1/api/conferences/mix/%conferenceId%/status`,
    headers: {
      'Authorization': authHeader
    }
  }
};

app.get("/api/token", (req, res, next) => {
  return axios(requests.token)
         .then(r => {
           accessToken = r.data.access_token;
           refreshToken = r.data.refresh_token;
           return res.json(accessToken);
         })
         .catch(e => {
           console.error('Could not get token', requests.token, e.message/*, e*/);
           res.status(401).send('invalid token...');
         });
});

app.get("/api/refresh", (req, res, next) => {
  let request = Object.assign({}, requests.refresh);
  request.data = {
    'refresh_token': refreshToken
  }

  return axios(request)
           .then(r => {
             accessToken = r.data.access_token;
             return res.json(accessToken);
           })
           .catch(next);
});

app.get("/api/invalidate", (req, res, next) => {
  let request = Object.assign({}, requests.invalidate);
  request.data = {
    'access_token': accessToken
  }

  return axios(request)
           .then(r => {
             return res.json("OK");
           })
           .catch(next);
});

app.get("/api/finished/:conferenceId", (req, res) => {
  console.log("received finished for: ", req.params.conferenceId);
  let request = Object.assign({}, requests.url);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId);

  axios(request)
    .then((res) => console.log(res))
    .catch(e => console.error(e));

  return res.end();
});

app.get("/api/finished2/:conferenceId", (req, res) => {
  console.log("received finished for: ", req.params.conferenceId);
  let request = Object.assign({}, requests.url);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId);

  //axios(request)
  //  .then((res) => console.log(res))
  //  .catch(e => console.error(e));

  console.log("Finished 2");

  return res.end();
});

app.get("/api/mix/:conferenceId", (req, res, next) => {
  let request = Object.assign({}, requests.mix);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId)
  request.data = {
    force: true
  };
  return axios(request)
    .then((r) => res.end(JSON.stringify(r.data)))
    .catch(next);
});

app.get("/api/mix2/:conferenceId", (req, res, next) => {
  let request = Object.assign({}, requests.mix2);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId)
  request.data = {
    force: true
  };
  return axios(request)
    .then((r) => res.end(JSON.stringify(r.data)))
    .catch(next);
});

app.get("/api/live/:conferenceId", (req, res, next) => {
  let request = Object.assign({}, requests.live);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId)
  request.data = {
    uri: req.query.uri
  };

  return axios(request)
    .then(() => res.end())
    .catch(next);
});

app.get("/api/stop/:conferenceId", (req, res, next) => {
  let request = Object.assign({}, requests.stop);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId)

  return axios(request)
    .then(() => res.end())
    .catch(next);
});

app.get("/api/status/:conferenceId", (req, res, next) => {
  let request = Object.assign({}, requests.status);
  request.url = request.url.replace(/%conferenceId%/g, req.params.conferenceId)

  return axios(request)
    .then((r) => res.end(JSON.stringify(r.data)))
    .catch(next);
});

app.use(express.static('src'))

// Browser History

https.createServer({
  key: fs.readFileSync( key_path ),
  cert: fs.readFileSync( cert_path ),
  ca: fs.readFileSync( ca_path )
}, app).listen(port);
