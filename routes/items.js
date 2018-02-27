
'use strict';

const express = require('express');
const knex = require('../knex')

const router = express.Router();

router.get('/', getAllMessages)
router.post('/', createMessage)
router.get('/:id', getMessage)
router.patch('/:id', updateMessage)
router.delete('/:id', deleteMessage)

function getAllMessages(req, res) {
    return knex('messages')
      .select ('id', 'name', 'message')
      .then(messages => {
        if (messages && messages.length > 0) res.status(200).json(messages)
        else res.sendStatus(404)
      })
}

function createMessage(req, res) {

    return knex('messages')
      .insert({ name: req.body.name, message: req.body.message })
      .returning(['name', 'message'])
      .then(messages => {
        if (messages && messages.length > 0) res.status(200).json(messages[0])
        else res.sendStatus(400)
      })
}

function getMessage(req, res) {
    return knex('messages')
      .select ('id', 'name', 'message')
      .where('id', req.params.id)
      .then(messages => {
        if (messages && messages.length > 0) res.status(200).json(messages[0])
        else res.sendStatus(404)
      })
}

function deleteMessage(req, res) {
    return knex('messages')
      .del()
      .where('id', req.params.id)
      .returning(['id', 'name', 'message'])
      .then(messages => {
        if (messages && messages.length > 0) res.status(200).json(messages[0])
        else res.sendStatus(404)
      })
}

function updateMessage(req, res) {
    console.log(req.body.message);
    return knex('messages')
      .where('id', req.params.id)
      .update ({ 'name': req.body.name, 'message': req.body.message })
      .returning(['id', 'name', 'message'])
      .then(messages => {
        if (messages && messages.length > 0) res.status(200).json(messages[0])
        else res.sendStatus(404)
      })
}





module.exports = router;
