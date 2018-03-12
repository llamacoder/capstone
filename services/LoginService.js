'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('../knex')
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// const TOKEN_SECRET = "tester14";

/*
 * Middleware to make sure required login info is present
 */
function verifyLoginBody(req, res, next) {
  console.log("verifying login body");
  const {email, password} = req.body;
  if (!email && !password) {
    res.status(401).send('Email and password required');
  } else if (!email) {
    res.status(401).send('Email required');
  } else if (!password) {
    res.status(401).send('Password required');
  } else {
    next();
  }
}

/*
 * Middleware to fetch the user with the requested email
 * address and attach it to the request
 */
function checkIfUserIsRegistered(req, res, next) {
  console.log("checking if user is registered");
  const {email} = req.body;

  getUserByEmail(email).then(user => {
    console.log("user: " + user);
    if (!user) {
      res.status(403).send('Authorization Failed');
    } else {
      // Make user object accessible to future middlewares
      req.user = user;
      next();
    }
  }).catch(err => {
    res.status(500).send(`There was an error logging in: ${err}`);
  });
}

/*
 * Middleware to try and match the requested email/password
 * combination to the fetched user that's now attached to the
 * request
 */
function tryUserLogin(req, res, next) {
  console.log("trying user login");
  const {email, password} = req.body;
  const hashedPassword = req.user.pswd;

  bcrypt.compare(password, hashedPassword)
    .then(matches => {
      if (matches) {
        next();
      } else {
        res.status(403).send('Authorization Failed');
      }
    })
    .catch(err => {
      res.status(500).send(`There was an error logging in: ${err}`);
    })
}

async function generateToken(req, res, next) {
  console.log("generating token " + TOKEN_SECRET);
  const jwtPayload = {
      id: req.user.id,
      first_name: req.user.first_name,
      num_priorities: req.user.num_priorities,
      loggedIn: true
  };

  try {
    const token = await jwtSignAsync(jwtPayload, TOKEN_SECRET, {expiresIn: '1d'});
    res.status(200).json({
      token: token,
      user: req.user
    });
  } catch (err) {
    throw(err);
  }
}

/*
 * Get user data for the specified email address - should be unique.
 */
function getUserByEmail(email) {
  console.log(email);
  return knex('users').first().where('email', email)
}

/*
 * Make sure all the required data is present before attempting
 * to register.
 */
function verifyRegisterBody(req, res, next) {
  console.log("verifying register body");
  const {email, password, num_priorities, first_name} = req.body;
  if (!email || !password || !num_priorities || !first_name) {
    res.status(401).send('Email, password, first name, and number of priorities are all required');
  } else {
    next();
  }
}

/*
 * Handle the request to register a new user.
 */
function registerUser(req, res, next) {
  //  first make sure the email address doesn't already exist
  getUserByEmail(req.body.email).then(user => {
    if (user) {
      console.log("User already exists");
      res.status(409).json({error: "Email already exists"});
    } else {
      //  now encrypt the password and get a hash
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({error: err})
        } else {
          //  save the user
          knex('users').insert({'first_name': req.body.first_name, 'num_priorities': req.body.num_priorities, 'email': req.body.email, 'pswd': hash}).returning(['id', 'first_name', 'num_priorities']).then(results => {
            if (results.length < 1) {
              res.status(400).json({error: 'create failed'})
            } else {
              //  add the user to the req for later
              req.user = results[0];
              next()
            }
          }).catch(err => {
            console.log(err);
            res.status(500).json({error: err})
          })
        }
      })
    }
  })
  .catch(err => {
      console.log("Inside error");
      res.status(500).json({error: err})
  })
}

/*
 * Check for valid token in request before moving along
 */
function checkAuthorization(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch(error) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
}

module.exports = {
  verifyLoginBody,
  checkIfUserIsRegistered,
  tryUserLogin,
  generateToken,
  registerUser,
  verifyRegisterBody,
  checkAuthorization
};
