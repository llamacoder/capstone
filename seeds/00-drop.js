exports.seed = function(knex, Promise) {
  return knex('users_tips').del()
    .then(() => knex('tips').del())
    .then(() => knex('items').del())
    .then(() => knex('users').del())
}
