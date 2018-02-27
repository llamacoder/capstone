
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tips', table => {
    table.increments('id')
    table.string('tip_text').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tips')
};
