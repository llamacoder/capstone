'use strict';

const express = require('express');
const knex = require('../knex')

const router = express.Router();

router.post('/', createUser)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)

function getOneUser(req, res) {
  return knex('users')
      .select('id','first_name', 'num_priorities')
      .where('id', req.params.id)
      .then(results => {
        if (results.length < 1) {
          res.status(404).json({error: 'not found'})
        } else {
          res.status(200).json(results[0])
        }
      })
}

function createUser(req, res) {
  return knex('users')
    .insert({'first_name':req.body.first_name,
              'num_priorities':req.body.num_priorities,
              'email':req.body.email})
    .returning(['first_name', 'num_priorities'])
    .then(results => {
      if (results.length < 1) {
        res.status(400).json({error: 'create failed'})
      } else {
        res.status(200).json(results[0])
      }
    })
}

function updateUser(req, res) {
  return knex('users')
    .update({'first_name':req.body.first_name,
              'num_priorities':req.body.num_priorities })
    .where('id', req.params.id)
    .returning(['id', 'first_name', 'num_priorities'])
    .then(results => {
      if (results.length < 1) {
        res.status(400).json({error: 'update failed'})
      } else {
        res.status(200).json(results[0])
      }
    })
}


module.exports = router;
