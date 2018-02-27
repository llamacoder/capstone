
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments('id')
    table.string('item_text').notNullable()
    table.string('status').notNullable()
    table.string('source').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
};
