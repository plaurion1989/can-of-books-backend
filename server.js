'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://dev-o879tgum.us.auth0.com/.well-known/jwks.json',
});

const app = express();
app.use(cors());

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const PORT = process.env.PORT || 3001;

app.get('/books', (request, response) => {
  // STEP 1: get the jwt from the headers
  const token = request.headers.authorization.split(' ')[1];
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
      response.send('whoops...jtw.verify issue');
    }
    response.send(user);
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
