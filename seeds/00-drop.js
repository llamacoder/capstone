exports.seed = function(knex, Promise) {
  return knex('tips').del()
    .then(() => knex('items').del())
    .then(() => knex('users').del())
}
