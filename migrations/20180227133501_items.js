
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.string('item_text').notNullable()
    table.string('status').notNullable()
    table.integer('priority').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
};
