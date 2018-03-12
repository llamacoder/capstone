
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_tips').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_tips').insert([
        {user_id: 1, tip_id: 1},
        {user_id: 2, tip_id: 2},
        {user_id: 3, tip_id: 3}
      ]);
    });
};
