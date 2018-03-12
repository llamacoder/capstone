
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('email').notNullable().unique()
    table.string('pswd').notNullable()
    table.integer('num_priorities').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
