
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'test@test.com', pswd: '1234', num_priorities: 3,
                first_name: "Rich"},
        {id: 2, email: 'test1@test.com', pswd: '1234', num_priorities: 3,
                first_name: "Fred"},
        {id: 3, email: 'test2@test.com', pswd: '1234', num_priorities: 3,
                first_name: "Lisa"}
      ]);
    });
};
