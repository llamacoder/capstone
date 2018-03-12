'use strict';

const express = require('express');
const router = express.Router();
const dataService = require('../services/DataService');
const loginService = require('../services/LoginService');
const bcrypt = require('bcrypt');

/*
 * Use the data service to accomplish all the server tasks
 * except for authorization.
 */
router.get('/users', loginService.checkAuthorization,
                            dataService.getAllUsers)
router.get('/users/:id', loginService.checkAuthorization,
                            dataService.getOneUser)
router.patch('/users/:id', loginService.checkAuthorization,
                            dataService.updateUser)
router.get('/items', loginService.checkAuthorization,
                            dataService.getAllItems)
router.get('/items/:id', loginService.checkAuthorization,
                            dataService.getItemsForUser)
router.post('/items', loginService.checkAuthorization,
                            dataService.createItem)
router.patch('/items/:id', loginService.checkAuthorization,
                            dataService.updateItem)
router.delete('/items/:id', loginService.checkAuthorization,
                            dataService.deleteItem)

/*
 * Use the login service for registration, login and authorization tasks.
 */
router.post('/register', loginService.verifyRegisterBody,
                          loginService.registerUser,
                          loginService.generateToken)
router.post('/login', loginService.verifyLoginBody,
                      loginService.checkIfUserIsRegistered,
                      loginService.tryUserLogin,
                      loginService.generateToken)
// router.get('/logout', loginService.logoutUser)

module.exports = router;
