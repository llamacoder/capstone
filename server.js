'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const users = require('./routes/users');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(express.static(path.join('public')));

app.use('/users',users);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
