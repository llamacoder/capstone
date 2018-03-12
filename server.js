'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

// ********************************************
/*
 * Store the secret needed for JWT signing and
 * verifying in an environmental variable TOKEN_SECRET stored in
 * the .env file and loaded into `process.env` with the `dotenv`
 * library.  Interestingly, this must be done before the routes
 * are loaded. ?
 * */

require('dotenv').config();

// const routes = require('./routes/routes');



// This bit is for cross-origin requests.  I don't need it
// at the moment, but I'm going to leave it in here in case
// requirements change

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(express.static(path.join('public')));

/*
 * Route to the appropriate functions
* */
// app.use('/',routes);

/*
 * Catchall route handler for any requests to routes
 * not deliberately handled.
* */
app.use((req, res) => {
  res.sendStatus(404);
});

/*
 * Start the server (off we go!)
* */
app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
