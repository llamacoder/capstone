'use strict';

const express = require('express');
const knex = require('../knex')

/*
 * Get all the user data.
 */
function getAllUsers(req, res) {
  return knex('users').select('id', 'first_name', 'num_priorities', 'email').then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'no users'})
    } else {
      res.status(200).json(results)
    }
  })
}

/*
 * Get user data for the specified user_id from the params.
 */
function getOneUser(req, res) {
  return knex('users').select('id', 'first_name', 'num_priorities').where('id', req.params.id).then(results => {
    if (results.length < 1) {
      res.status(404).json({error: 'not found'})
    } else {
      res.status(200).json(results[0])
    }
  })
}

/*
 * Update user data for the specified user_id from the params.
 * Use field data from the request.
 */
function updateUser(req, res) {
  return knex('users').update({'first_name': req.body.first_name, 'num_priorities': req.body.num_priorities, 'email': req.body.email}).where('id', req.params.id).returning(['id', 'first_name', 'num_priorities']).then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'update failed'})
    } else {
      res.status(200).json(results[0])
    }
  })
}

/*
 * Get all the item data.
 */
function getAllItems(req, res) {
  return knex('items').then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'no items'})
    } else {
      res.status(200).json(results)
    }
  })
}

/*
 * Get item data for the specified user_id from the params.
 */
function getItemsForUser(req, res) {
  return knex('items').where('user_id', req.params.id).then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'no items'})
    } else {
      res.status(200).json(results)
    }
  })
}

/*
  * Create a new item using field data from the request.
  */
function createItem(req, res) {
  return knex('items').insert({'user_id': req.body.user_id, 'item_text': req.body.item_text, 'status': req.body.status, 'source': req.body.source}).returning(['item_text', 'status']).then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'create item failed'})
    } else {
      res.status(200).json(results[0])
    }
  })
}

/*
   * Update item data for the specified item_id from the params.
   * Use field data from the request.
   */
function updateItem(req, res) {
  return knex('items').update({'user_id': req.body.user_id, 'item_text': req.body.item_text, 'status': req.body.status, 'source': req.body.source}).where('id', req.params.id).returning(['item_text', 'status']).then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'update item failed'})
    } else {
      res.status(200).json(results[0])
    }
  })

}

/*
    * Delete item data for the specified item_id from the params.
    */
function deleteItem(req, res) {
  return knex('items').delete().where('id', req.params.id).then(results => {
    if (results.length < 1) {
      res.status(400).json({error: 'delete item failed'})
    } else {
      res.status(200).json(results[0])
    }
  })
}

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  getItemsForUser,
  getAllItems,
  createItem,
  updateItem,
  deleteItem
};
