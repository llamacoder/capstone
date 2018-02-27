
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_tips', table => {
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.integer('tip_id').notNullable()
    table.foreign('tip_id').references('tips.id')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_tips')
};
